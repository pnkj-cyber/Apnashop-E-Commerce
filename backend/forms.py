from django import forms
from django.contrib.auth.models import User
from .models import UserProfile, Product, Order, Review

PUBLIC_USER_TYPE_CHOICES = (
    ('buyer', 'Buyer'),
    ('supplier', 'Supplier'),
)

class UserRegistrationForm(forms.Form):
    username = forms.CharField(max_length=150)
    email = forms.EmailField()
    phone = forms.CharField(max_length=20)
    password = forms.CharField(widget=forms.PasswordInput)
    user_type = forms.ChoiceField(choices=PUBLIC_USER_TYPE_CHOICES, initial='buyer')

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username=username).exists() or User.objects.filter(email=username).exists():
            raise forms.ValidationError("A user with this username or email already exists.")
        return username

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email__iexact=email).exists():
            raise forms.ValidationError("A user with this email address already exists.")
        return email.lower()

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if UserProfile.objects.filter(phone=phone).exists():
            raise forms.ValidationError("A user with this contact number already exists.")
        return phone

class UserLoginForm(forms.Form):
    username = forms.CharField(max_length=150)  # Username or Email
    password = forms.CharField(widget=forms.PasswordInput)
    user_type = forms.ChoiceField(choices=PUBLIC_USER_TYPE_CHOICES, initial='buyer')

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['phone', 'address', 'user_type']

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['sku', 'category', 'name', 'brand', 'price', 'discount', 'image', 'in_stock']

    def clean_price(self):
        price = self.cleaned_data.get('price')
        if price is not None and price < 0:
            raise forms.ValidationError("Price must be a positive number.")
        return price

    def clean_discount(self):
        discount = self.cleaned_data.get('discount')
        if discount is not None and (discount < 0 or discount > 100):
            raise forms.ValidationError("Discount must be between 0 and 100.")
        return discount

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['name', 'email', 'rating', 'comment']

    def clean_rating(self):
        rating = self.cleaned_data.get('rating')
        if rating is not None and (rating < 1 or rating > 5):
            raise forms.ValidationError("Rating must be between 1 and 5.")
        return rating

class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['payment_method', 'shipping_address']
