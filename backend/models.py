from django.db import models
from django.contrib.auth.models import User

# User profile extending built-in User with ApnaShop fields
class UserProfile(models.Model):
    USER_TYPE_CHOICES = (
        ('buyer', 'Buyer'),
        ('supplier', 'Supplier'),
        ('admin', 'Admin'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='buyer')
    address = models.TextField(blank=True, default='')

    def __str__(self):
        return f"{self.user.username} ({self.get_user_type_display()})"

# Product Model
class Product(models.Model):
    sku = models.CharField(max_length=100, primary_key=True)  # e.g., 'mobiles-15'
    category = models.CharField(max_length=100)
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=100)
    price = models.IntegerField()  # Price in INR
    discount = models.IntegerField(default=0)  # discount percentage
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=5.0)
    image = models.URLField(max_length=500)
    in_stock = models.BooleanField(default=True)
    supplier = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='supplied_products')

    def __str__(self):
        return self.name

# Order Model
class Order(models.Model):
    order_id = models.CharField(max_length=50, primary_key=True)  # e.g. '#APN-123456'
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Processing')
    subtotal = models.IntegerField()
    discount = models.IntegerField(default=0)
    total = models.IntegerField()
    payment_method = models.CharField(max_length=100, default='Cash on Delivery')
    shipping_address = models.TextField()

    def __str__(self):
        return self.order_id

# OrderItem Model
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    product_name = models.CharField(max_length=255)
    price = models.IntegerField()
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product_name}"

# Review Model
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.name} for {self.product.name}"
