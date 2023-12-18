# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django.contrib.auth.models import User
# from rest_framework.authtoken.models import Token

# # Define a signal receiver function to create an authentication token for a new user
# @receiver(post_save, sender=User)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     """
#     Signal receiver function to create an authentication token for a new user.

#     Parameters:
#     - sender: The model class that sent the signal (User in this case).
#     - instance: The actual instance being saved (a User instance in this case).
#     - created: A boolean indicating whether the instance was just created.

#     Keyword Arguments:
#     - kwargs: Additional keyword arguments passed to the signal.

#     Note:
#     This function is connected to the post_save signal of the User model.
#     It checks if a new user is created and then creates an authentication token for that user.
#     """
#     if created:
#         Token.objects.create(user=instance)
