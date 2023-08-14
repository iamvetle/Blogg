from django.test import TestCase
from .models import CustomUser
from django.contrib.auth import authenticate

# Create your tests here.

class CustomUserTestCase(TestCase):
        
    def setUp(self): # test user creation
        self.user = CustomUser.objects.create_user(
            username="test",
            email="test@eXaMpLe.cOm",
            first_name="John",
            last_name="Smith",
            password="testing123"
        )
        
    def test_created_user(self):
        self.assertEqual(self.user.username, "test")
        self.assertEqual(self.user.email, "test@example.com")
        self.assertEqual(self.user.first_name, "John")
        self.assertEqual(self.user.last_name, "Smith")
        
        self.assertTrue(self.user.check_password("testing123"))
        self.assertTrue(self.user.is_active)
        self.assertFalse(self.user.is_superuser)
        self.assertFalse(self.user.is_staff)
    
    def test_user_methods(self):
        # __str__ return
        self.assertEqual(str(self.user), "test")
        
        # custom methods
        self.assertEqual(self.user.short_name(), "John")
        self.assertEqual(self.user.full_name(), "John Smith")
        
    def test_user_authentication(self): # test user authentication - can the user auth
        valid_user = authenticate(username="test", password="testing123")

        self.assertIsNotNone(valid_user)
        
        
class CustomSuperUserTestCase(TestCase):
        
    def setUp(self): # test user creation
        self.superuser = CustomUser.objects.create_superuser(
            username="test",
            email="test@eXaMpLe.cOm",
            first_name="John",
            last_name="Smith",
            password="testing123"
        )
        
    def test_created_user(self):
        self.assertEqual(self.superuser.username, "test")
        self.assertEqual(self.superuser.email, "test@example.com")
        self.assertEqual(self.superuser.first_name, "John")
        self.assertEqual(self.superuser.last_name, "Smith")
        
        self.assertTrue(self.superuser.check_password("testing123"))
        self.assertTrue(self.superuser.is_active)
        self.assertTrue(self.superuser.is_superuser)
        self.assertTrue(self.superuser.is_staff)
    
    def test_user_methods(self):
        # __str__ return
        self.assertEqual(str(self.superuser), "test")
        
        # custom methods
        self.assertEqual(self.superuser.short_name(), "John")
        self.assertEqual(self.superuser.full_name(), "John Smith")
        
    def test_user_authentication(self): # test user authentication - can the user auth
        valid_user = authenticate(username="test", password="testing123")

        self.assertIsNotNone(valid_user)