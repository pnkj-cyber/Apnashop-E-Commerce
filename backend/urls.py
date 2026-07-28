from django.urls import path
from . import views

urlpatterns = [
    # Auth Endpoints
    path('api/auth/register/', views.register_api, name='register_api'),
    path('api/auth/login/', views.login_api, name='login_api'),
    path('api/auth/logout/', views.logout_api, name='logout_api'),
    path('api/auth/profile/', views.profile_api, name='profile_api'),

    # Product Endpoints
    path('api/products/', views.product_list_api, name='product_list_api'),
    path('api/products/create/', views.product_create_api, name='product_create_api'),
    path('api/products/<str:sku>/delete/', views.product_delete_api, name='product_delete_api'),
    path('api/products/<str:sku>/', views.product_detail_api, name='product_detail_api'),
    path('api/products/<str:sku>/review/', views.add_review_api, name='add_review_api'),

    # Order Endpoints
    path('api/orders/', views.user_orders_api, name='user_orders_api'),
    path('api/orders/place/', views.place_order_api, name='place_order_api'),

    # Admin Endpoints
    path('api/admin/users/', views.admin_users_list_api, name='admin_users_list_api'),
    path('api/admin/users/create/', views.admin_user_create_api, name='admin_user_create_api'),
    path('api/admin/users/<int:user_id>/update/', views.admin_user_update_api, name='admin_user_update_api'),
    path('api/admin/users/<int:user_id>/delete/', views.admin_user_delete_api, name='admin_user_delete_api'),
]
