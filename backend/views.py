import json
import random
import time
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db import transaction
from django.db.models import Q, Avg
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from functools import wraps

from .models import UserProfile, Product, Order, OrderItem, Review
from .forms import (
    UserRegistrationForm, UserLoginForm, UserProfileForm, 
    ProductForm, ReviewForm, OrderForm
)
from .jwt_utils import encode_jwt, decode_jwt

# CORS & Method wrapper to handle preflight OPTIONS and JSON Responses
def api_view(allowed_methods):
    def decorator(view_func):
        @csrf_exempt
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            origin = request.headers.get('Origin', '*')
            
            # Handle Preflight OPTIONS
            if request.method == 'OPTIONS':
                response = HttpResponse()
                response['Access-Control-Allow-Origin'] = origin
                response['Access-Control-Allow-Methods'] = ', '.join(allowed_methods)
                response['Access-Control-Allow-Headers'] = 'Content-Type, X-CSRFToken, Authorization'
                response['Access-Control-Allow-Credentials'] = 'true'
                return response
            
            if request.method not in allowed_methods:
                response = JsonResponse({'success': False, 'error': f'Method {request.method} not allowed'}, status=405)
                response['Access-Control-Allow-Origin'] = origin
                return response
            
            # Parse Request Data (JSON or POST/GET)
            request.data = {}
            if request.content_type and request.content_type.split(';')[0] == 'application/json':
                try:
                    request.data = json.loads(request.body.decode('utf-8'))
                except Exception:
                    pass
            else:
                if request.method == 'GET':
                    request.data = {k: v for k, v in request.GET.items()}
                else:
                    request.data = {k: v for k, v in request.POST.items()}
            
            # Try to authenticate using JWT Authorization header
            auth_header = request.headers.get('Authorization')
            if auth_header and auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
                try:
                    payload = decode_jwt(token, settings.SECRET_KEY)
                    user_id = payload.get('user_id')
                    if user_id:
                        request.user = User.objects.get(pk=user_id)
                except Exception:
                    # If invalid/expired token, request.user remains AnonymousUser
                    pass

            # Execute original view function
            try:
                response = view_func(request, *args, **kwargs)
                if not isinstance(response, HttpResponse):
                    response = JsonResponse(response)
            except Exception as e:
                response = JsonResponse({'success': False, 'error': str(e)}, status=500)
                
            response['Access-Control-Allow-Origin'] = origin
            response['Access-Control-Allow-Methods'] = ', '.join(allowed_methods)
            response['Access-Control-Allow-Headers'] = 'Content-Type, X-CSRFToken, Authorization'
            response['Access-Control-Allow-Credentials'] = 'true'
            return response
        return _wrapped_view
    return decorator

# --- AUTH API VIEWS ---

def _clean_text(value):
    return str(value or '').strip()

def _clean_email(value):
    return _clean_text(value).lower()

def _clean_phone(value):
    return ''.join(ch for ch in _clean_text(value) if ch.isdigit())

def _build_unique_username(email, name):
    username = email.split('@')[0] if '@' in email else name.replace(' ', '_').lower()
    username = username or 'user'
    username = username[:140]
    orig_username = username
    counter = 1
    while User.objects.filter(username=username).exists():
        username = f"{orig_username}{counter}"
        counter += 1
    return username

def _serialize_user(user, profile):
    return {
        'name': user.first_name or user.username,
        'email': user.email,
        'phone': profile.phone,
        'userType': profile.user_type,
        'address': profile.address
    }

def _build_auth_response(user, profile, message):
    token_payload = {
        'user_id': user.pk,
        'username': user.username,
        'email': user.email,
        'user_type': profile.user_type,
        'exp': time.time() + 86400  # 24 hours
    }
    token = encode_jwt(token_payload, settings.SECRET_KEY)
    return {
        'success': True,
        'message': message,
        'token': token,
        'user': _serialize_user(user, profile)
    }

@api_view(['POST'])
def register_api(request):
    data = request.data
    name = _clean_text(data.get('name'))
    email = _clean_email(data.get('email'))
    phone = _clean_phone(data.get('phone'))
    username = _build_unique_username(email, name)

    form_data = {
        'username': username,
        'email': email,
        'phone': phone,
        'password': data.get('password') or '',
        'user_type': data.get('userType') or 'buyer'
    }
    
    form = UserRegistrationForm(form_data)
    if form.is_valid():
        with transaction.atomic():
            user = User.objects.create_user(
                username=form.cleaned_data['username'],
                email=form.cleaned_data['email'],
                password=form.cleaned_data['password'],
                first_name=name
            )
            profile = UserProfile.objects.create(
                user=user,
                phone=form.cleaned_data['phone'],
                user_type=form.cleaned_data['user_type'],
                address=''
            )
        
        # Log user in
        login(request, user)
        return _build_auth_response(user, profile, 'Registration successful!')
    else:
        errors = {field: error_list[0] for field, error_list in form.errors.items()}
        return {'success': False, 'errors': errors}

@api_view(['POST'])
def login_api(request):
    data = request.data
    login_user = _clean_text(data.get('loginUser'))  # can be email or phone or username
    password = data.get('password') or ''
    requested_user_type = data.get('userType')

    # Find User by email or phone or username
    user = None
    if '@' in login_user:
        user = User.objects.filter(email__iexact=login_user).first()
    else:
        # Search by phone in UserProfile
        phone = _clean_phone(login_user)
        phone_query = Q(phone=login_user)
        if phone:
            phone_query |= Q(phone=phone)
        profile = UserProfile.objects.select_related('user').filter(phone_query).first()
        if profile:
            user = profile.user
            
    if not user:
        user = User.objects.filter(username=login_user).first()

    if user:
        # Authenticate
        authenticated_user = authenticate(username=user.username, password=password)
        if authenticated_user:
            profile = getattr(authenticated_user, 'profile', None)
            # User type is saved on registration. If an older client still sends
            # a role, keep honoring it; otherwise login by credentials only.
            if profile and (not requested_user_type or profile.user_type == requested_user_type):
                login(request, authenticated_user)
                display_name = authenticated_user.first_name or authenticated_user.username
                return _build_auth_response(authenticated_user, profile, f"Welcome back, {display_name}!")
            else:
                return {'success': False, 'error': f"Account found but not registered as a {requested_user_type}."}
    
    return {'success': False, 'error': 'Invalid credentials!'}

@api_view(['POST'])
def logout_api(request):
    logout(request)
    return {'success': True, 'message': 'Logged out successfully!'}

@api_view(['GET', 'POST'])
def profile_api(request):
    # Support session-based user or fallback to query param for static pages
    user = request.user
    if not user.is_authenticated:
        email = request.data.get('email') or request.GET.get('email')
        if email:
            user = User.objects.filter(email=email).first()
            
    if not user or not user.is_authenticated:
        return JsonResponse({'success': False, 'error': 'User not authenticated'}, status=401)

    profile = get_object_or_404(UserProfile, user=user)

    if request.method == 'POST':
        profile_data = request.data.copy()
        requested_user_type = profile_data.get('user_type')
        is_admin_user = profile.user_type == 'admin' or user.is_superuser or user.is_staff
        if requested_user_type == 'admin' and not is_admin_user:
            return {'success': False, 'error': 'Admin role cannot be selected from public profile settings.'}

        form = UserProfileForm(profile_data, instance=profile)
        if form.is_valid():
            # Support updating user email (gmail changed)
            email = request.data.get('email')
            if email:
                if User.objects.filter(email=email).exclude(pk=user.pk).exists():
                    return {'success': False, 'error': 'A user with this email address already exists.'}
                user.email = email
                user.save()
                
            form.save()
            # Also support updating user first name
            name = request.data.get('name')
            if name:
                user.first_name = name
                user.save()
                
            # Generate new JWT Token with updated user type
            token_payload = {
                'user_id': user.pk,
                'username': user.username,
                'email': user.email,
                'user_type': profile.user_type,
                'exp': time.time() + 86400  # 24 hours
            }
            token = encode_jwt(token_payload, settings.SECRET_KEY)
            
            return {
                'success': True,
                'message': 'Profile updated successfully!',
                'token': token,
                'user': {
                    'name': user.first_name,
                    'email': user.email,
                    'phone': profile.phone,
                    'userType': profile.user_type,
                    'address': profile.address
                }
            }
        return {'success': False, 'errors': form.errors}

    # GET Request
    return {
        'success': True,
        'user': {
            'name': user.first_name,
            'email': user.email,
            'phone': profile.phone,
            'userType': profile.user_type,
            'address': profile.address
        }
    }


# --- PRODUCT API VIEWS ---

@api_view(['GET'])
def product_list_api(request):
    products = Product.objects.all()
    data = request.data

    # 0. Filter by supplier (for supplier dashboard)
    supplier_only = data.get('supplierOnly')
    if supplier_only in ['true', True, 1, '1']:
        user = request.user
        if not user.is_authenticated:
            email = data.get('email') or request.GET.get('email')
            if email:
                user = User.objects.filter(email=email).first()
        if user and user.is_authenticated:
            products = products.filter(supplier=user)
        else:
            return {'success': False, 'error': 'User not authenticated for supplier products'}

    # 1. Filter by category
    category = data.get('category')
    if category:
        products = products.filter(category__iexact=category)

    # 2. Filter by Search Query
    search_query = data.get('search')
    if search_query:
        products = products.filter(
            Q(name__icontains=search_query) | 
            Q(brand__icontains=search_query) |
            Q(category__icontains=search_query)
        )

    # 3. Filter by Brand (comma separated list)
    brands_str = data.get('brands')
    if brands_str:
        brands = [b.strip() for b in brands_str.split(',') if b.strip()]
        if brands:
            products = products.filter(brand__in=brands)

    # 4. Filter by Max Price
    max_price = data.get('maxPrice')
    if max_price:
        try:
            products = products.filter(price__lte=int(max_price))
        except ValueError:
            pass

    # 5. Filter by inStockOnly
    in_stock = data.get('inStockOnly')
    if in_stock in ['true', True, 1, '1']:
        products = products.filter(in_stock=True)

    # 6. Filter by Rating
    ratings_str = data.get('ratings')
    if ratings_str:
        # e.g., "4,5"
        try:
            rating_floors = [float(r) for r in ratings_str.split(',') if r.strip()]
            if rating_floors:
                # Filter products where rating is >= min selected rating
                products = products.filter(rating__gte=min(rating_floors))
        except ValueError:
            pass

    # 7. Sorting
    sort_by = data.get('sort', 'popular')
    if sort_by == 'price-low':
        products = products.order_by('price')
    elif sort_by == 'price-high':
        products = products.order_by('-price')
    elif sort_by == 'discount':
        products = products.order_by('-discount')
    elif sort_by == 'rating':
        products = products.order_by('-rating')
    
    # Format product objects into dictionary list
    product_list = []
    for p in products:
        original_price = round(p.price / (1 - p.discount/100)) if p.discount > 0 else p.price
        product_list.append({
            'id': p.sku,
            'category': p.category,
            'name': p.name,
            'brand': p.brand,
            'price': p.price,
            'originalPrice': original_price,
            'discount': p.discount,
            'rating': float(p.rating),
            'image': p.image,
            'inStock': p.in_stock
        })

    return {
        'success': True,
        'count': len(product_list),
        'products': product_list
    }

@api_view(['GET'])
def product_detail_api(request, sku):
    product = get_object_or_404(Product, sku=sku)
    original_price = round(product.price / (1 - product.discount/100)) if product.discount > 0 else product.price
    
    # Fetch reviews
    reviews = []
    for r in product.reviews.all().order_by('-date'):
        reviews.append({
            'name': r.name,
            'email': r.email,
            'rating': r.rating,
            'comment': r.comment,
            'date': r.date.strftime('%d %B %Y')
        })

    return {
        'success': True,
        'product': {
            'id': product.sku,
            'category': product.category,
            'name': product.name,
            'brand': product.brand,
            'price': product.price,
            'originalPrice': original_price,
            'discount': product.discount,
            'rating': float(product.rating),
            'image': product.image,
            'inStock': product.in_stock,
            'reviews': reviews
        }
    }

@api_view(['POST'])
def product_create_api(request):
    user = request.user
    if not user.is_authenticated:
        # Fallback for API client support
        email = request.data.get('supplier_email')
        if email:
            user = User.objects.filter(email=email).first()

    if not user or getattr(user.profile, 'user_type', '') != 'supplier':
        return JsonResponse({'success': False, 'error': 'Only suppliers can perform this action.'}, status=403)

    form = ProductForm(request.data)
    if form.is_valid():
        product = form.save(commit=False)
        product.supplier = user
        product.save()
        return {
            'success': True,
            'message': 'Product added successfully!',
            'product_id': product.sku
        }
    return {'success': False, 'errors': form.errors}

@api_view(['POST', 'DELETE'])
def product_delete_api(request, sku):
    user = request.user
    if not user.is_authenticated:
        email = request.data.get('supplier_email')
        if email:
            user = User.objects.filter(email=email).first()

    if not user or getattr(user.profile, 'user_type', '') != 'supplier':
        return JsonResponse({'success': False, 'error': 'Only suppliers can perform this action.'}, status=403)

    product = get_object_or_404(Product, sku=sku)
    if product.supplier != user:
        return JsonResponse({'success': False, 'error': 'You do not own this product.'}, status=403)

    product.delete()
    return {
        'success': True,
        'message': 'Product removed successfully!'
    }


# --- REVIEW API VIEWS ---

@api_view(['POST'])
def add_review_api(request, sku):
    product = get_object_or_404(Product, sku=sku)
    form = ReviewForm(request.data)
    if form.is_valid():
        review = form.save(commit=False)
        review.product = product
        review.save()
        
        # Update product average rating dynamically
        avg_rating = product.reviews.all().aggregate(Avg('rating'))['rating__avg']
        if avg_rating is not None:
            product.rating = round(avg_rating, 1)
            product.save()

        return {
            'success': True,
            'message': 'Review submitted successfully!',
            'review': {
                'name': review.name,
                'rating': review.rating,
                'comment': review.comment,
                'date': review.date.strftime('%d %B %Y')
            }
        }
    return {'success': False, 'errors': form.errors}


# --- ORDER API VIEWS ---

@api_view(['POST'])
def place_order_api(request):
    data = request.data
    cart_items = data.get('cartItems', [])
    shipping_info = data.get('shippingInfo', {})

    if not cart_items:
        return {'success': False, 'error': 'Cart is empty.'}

    # Authenticate User via session or email
    user = request.user
    if not user.is_authenticated:
        email = shipping_info.get('email')
        if email:
            user = User.objects.filter(email=email).first()
            if not user:
                # Auto register buyer account if they don't have one
                username = email.split('@')[0]
                orig_username = username
                c = 1
                while User.objects.filter(username=username).exists():
                    username = f"{orig_username}{c}"
                    c += 1
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password=User.objects.make_random_password(),
                    first_name=shipping_info.get('name', 'Anonymous Buyer')
                )
                UserProfile.objects.create(user=user, phone=shipping_info.get('phone', ''), user_type='buyer')

    if not user:
        return {'success': False, 'error': 'Could not identify or register a user for this order.'}

    order_id = f"#APN-{random.randint(100000, 999999)}"
    
    # Extract calculations
    subtotal = int(data.get('subtotal', 0))
    discount = int(data.get('discount', 0))
    total = int(data.get('total', 0))
    payment_method = shipping_info.get('paymentMethod', 'Cash on Delivery')
    shipping_address = f"{shipping_info.get('name')}, {shipping_info.get('address')}, Phone: {shipping_info.get('phone')}"

    # Create Order
    order = Order.objects.create(
        order_id=order_id,
        user=user,
        subtotal=subtotal,
        discount=discount,
        total=total,
        payment_method=payment_method,
        shipping_address=shipping_address
    )

    # Save Items
    for item in cart_items:
        product_sku = item.get('id')
        product = Product.objects.filter(sku=product_sku).first()
        OrderItem.objects.create(
            order=order,
            product=product,
            product_name=item.get('name', 'Product'),
            price=int(item.get('price', 0)),
            quantity=int(item.get('quantity', 1))
        )

    return {
        'success': True,
        'message': 'Order placed successfully!',
        'orderId': order_id
    }

@api_view(['GET'])
def user_orders_api(request):
    user = request.user
    if not user.is_authenticated:
        email = request.data.get('email') or request.GET.get('email')
        if email:
            user = User.objects.filter(email=email).first()

    if not user or not user.is_authenticated:
        return JsonResponse({'success': False, 'error': 'User not authenticated'}, status=401)

    profile = getattr(user, 'profile', None)
    
    orders_list = []
    
    if profile and profile.user_type == 'supplier':
        # Return orders containing their products
        items = OrderItem.objects.filter(product__supplier=user).order_by('-order__date')
        # Group items by order to represent supplier orders
        orders_dict = {}
        for item in items:
            o = item.order
            if o.order_id not in orders_dict:
                orders_dict[o.order_id] = {
                    'orderId': o.order_id,
                    'date': o.date.strftime('%d %b %Y, %I:%M %p'),
                    'status': o.status,
                    'progressClass': f"progress-{o.status.lower()}",
                    'paymentMethod': o.payment_method,
                    'shippingAddress': o.shipping_address,
                    'subtotal': 0,
                    'discount': 0,
                    'total': 0,
                    'items': []
                }
            
            orig_price = round(item.product.price / (1 - item.product.discount/100)) if item.product and item.product.discount > 0 else item.price
            orders_dict[o.order_id]['items'].append({
                'id': item.product.sku if item.product else '',
                'name': item.product_name,
                'price': item.price,
                'originalPrice': orig_price,
                'quantity': item.quantity,
                'image': item.product.image if item.product else ''
            })
            orders_dict[o.order_id]['subtotal'] += item.price * item.quantity
            orders_dict[o.order_id]['total'] += item.price * item.quantity
        orders_list = list(orders_dict.values())
    else:
        # Buyer: return all their orders
        orders = Order.objects.filter(user=user).order_by('-date')
        for o in orders:
            items = []
            for item in o.items.all():
                orig_price = round(item.product.price / (1 - item.product.discount/100)) if item.product and item.product.discount > 0 else item.price
                items.append({
                    'id': item.product.sku if item.product else '',
                    'name': item.product_name,
                    'price': item.price,
                    'originalPrice': orig_price,
                    'quantity': item.quantity,
                    'image': item.product.image if item.product else ''
                })
            
            orders_list.append({
                'orderId': o.order_id,
                'date': o.date.strftime('%d %b %Y, %I:%M %p'),
                'status': o.status,
                'progressClass': f"progress-{o.status.lower()}",
                'paymentMethod': o.payment_method,
                'shippingAddress': o.shipping_address,
                'subtotal': o.subtotal,
                'discount': o.discount,
                'total': o.total,
                'items': items
            })

    return {
        'success': True,
        'orders': orders_list
    }


# --- ADMIN API VIEWS ---

@api_view(['GET'])
def admin_users_list_api(request):
    user = request.user
    if not user.is_authenticated or (getattr(getattr(user, 'profile', None), 'user_type', '') != 'admin' and not user.is_superuser and not user.is_staff):
        return JsonResponse({'success': False, 'error': 'Only administrators can perform this action.'}, status=403)
    
    users_data = []
    for u in User.objects.all().order_by('-date_joined'):
        profile = getattr(u, 'profile', None)
        users_data.append({
            'id': u.pk,
            'username': u.username,
            'name': u.first_name or u.username,
            'email': u.email,
            'phone': profile.phone if profile else '',
            'userType': profile.user_type if profile else 'buyer',
            'address': profile.address if profile else '',
            'dateJoined': u.date_joined.strftime('%d %b %Y')
        })
    return {'success': True, 'users': users_data}

@api_view(['POST'])
def admin_user_create_api(request):
    user = request.user
    if not user.is_authenticated or (getattr(getattr(user, 'profile', None), 'user_type', '') != 'admin' and not user.is_superuser and not user.is_staff):
        return JsonResponse({'success': False, 'error': 'Only administrators can perform this action.'}, status=403)
    
    data = request.data
    email = data.get('email', '')
    username = data.get('username') or (email.split('@')[0] if '@' in email else data.get('name', '').replace(' ', '_').lower())
    
    orig_username = username
    counter = 1
    while User.objects.filter(username=username).exists():
        username = f"{orig_username}{counter}"
        counter += 1
        
    if User.objects.filter(email=email).exists():
        return {'success': False, 'error': 'A user with this email address already exists.'}
        
    try:
        new_user = User.objects.create_user(
            username=username,
            email=email,
            password=data.get('password', 'ApnaShopUserPass123'),
            first_name=data.get('name', '')
        )
        UserProfile.objects.create(
            user=new_user,
            phone=data.get('phone', ''),
            user_type=data.get('userType', 'buyer'),
            address=data.get('address', '')
        )
        return {'success': True, 'message': 'User created successfully!'}
    except Exception as e:
        return {'success': False, 'error': str(e)}

@api_view(['POST'])
def admin_user_update_api(request, user_id):
    user = request.user
    if not user.is_authenticated or (getattr(getattr(user, 'profile', None), 'user_type', '') != 'admin' and not user.is_superuser and not user.is_staff):
        return JsonResponse({'success': False, 'error': 'Only administrators can perform this action.'}, status=403)
        
    target_user = get_object_or_404(User, pk=user_id)
    profile = get_object_or_404(UserProfile, user=target_user)
    
    data = request.data
    email = data.get('email')
    if email and email != target_user.email:
        if User.objects.filter(email=email).exclude(pk=target_user.pk).exists():
            return {'success': False, 'error': 'A user with this email address already exists.'}
        target_user.email = email
        
    name = data.get('name')
    if name:
        target_user.first_name = name
        
    password = data.get('password')
    if password:
        target_user.set_password(password)
        
    target_user.save()
    
    if 'phone' in data:
        profile.phone = data.get('phone')
    if 'userType' in data:
        profile.user_type = data.get('userType')
    if 'address' in data:
        profile.address = data.get('address')
        
    profile.save()
    return {'success': True, 'message': 'User details updated successfully!'}

@api_view(['POST', 'DELETE'])
def admin_user_delete_api(request, user_id):
    user = request.user
    if not user.is_authenticated or (getattr(getattr(user, 'profile', None), 'user_type', '') != 'admin' and not user.is_superuser and not user.is_staff):
        return JsonResponse({'success': False, 'error': 'Only administrators can perform this action.'}, status=403)
        
    target_user = get_object_or_404(User, pk=user_id)
    if target_user == user:
        return {'success': False, 'error': 'You cannot delete your own admin account.'}
        
    target_user.delete()
    return {'success': True, 'message': 'User deleted successfully!'}
