import json

from django.contrib.auth.models import User
from django.test import Client, TestCase

from .models import UserProfile


class AuthApiTests(TestCase):
    def setUp(self):
        self.client = Client()

    def post_json(self, path, payload):
        return self.client.post(
            path,
            data=json.dumps(payload),
            content_type='application/json'
        )

    def test_register_saves_user_profile_and_returns_token(self):
        response = self.post_json('/api/auth/register/', {
            'name': 'Pankaj Buyer',
            'email': 'Pankaj.Buyer@Example.com',
            'phone': '98765 43210',
            'password': 'StrongPass123',
            'userType': 'buyer',
        })

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data['success'])
        self.assertTrue(data['token'])
        self.assertEqual(data['user']['email'], 'pankaj.buyer@example.com')
        self.assertEqual(data['user']['phone'], '9876543210')

        user = User.objects.get(email='pankaj.buyer@example.com')
        self.assertEqual(user.first_name, 'Pankaj Buyer')
        self.assertTrue(user.check_password('StrongPass123'))

        profile = UserProfile.objects.get(user=user)
        self.assertEqual(profile.phone, '9876543210')
        self.assertEqual(profile.user_type, 'buyer')

    def test_login_reads_saved_user_by_email_and_phone(self):
        user = User.objects.create_user(
            username='supplier',
            email='supplier@example.com',
            password='StrongPass123',
            first_name='Supplier User'
        )
        UserProfile.objects.create(user=user, phone='9123456780', user_type='supplier')

        email_response = self.post_json('/api/auth/login/', {
            'loginUser': 'SUPPLIER@example.com',
            'password': 'StrongPass123',
        })
        phone_response = self.post_json('/api/auth/login/', {
            'loginUser': '91234 56780',
            'password': 'StrongPass123',
        })

        for response in (email_response, phone_response):
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertTrue(data['success'])
            self.assertTrue(data['token'])
            self.assertEqual(data['user']['email'], 'supplier@example.com')
            self.assertEqual(data['user']['phone'], '9123456780')
            self.assertEqual(data['user']['userType'], 'supplier')

    def test_register_rejects_duplicate_email_or_phone(self):
        existing = User.objects.create_user(
            username='existing',
            email='existing@example.com',
            password='StrongPass123',
        )
        UserProfile.objects.create(user=existing, phone='9000000000', user_type='buyer')

        duplicate_email = self.post_json('/api/auth/register/', {
            'name': 'Other User',
            'email': 'EXISTING@example.com',
            'phone': '9111111111',
            'password': 'StrongPass123',
            'userType': 'buyer',
        }).json()
        duplicate_phone = self.post_json('/api/auth/register/', {
            'name': 'Other User',
            'email': 'other@example.com',
            'phone': '90000 00000',
            'password': 'StrongPass123',
            'userType': 'buyer',
        }).json()

        self.assertFalse(duplicate_email['success'])
        self.assertIn('email', duplicate_email['errors'])
        self.assertFalse(duplicate_phone['success'])
        self.assertIn('phone', duplicate_phone['errors'])
