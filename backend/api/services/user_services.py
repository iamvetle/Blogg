from ..serializers import UserProfileSerializer, FollowersSerializer
from django.contrib.auth import get_user_model


CustomUser = get_user_model()

### USER HANDLING
    
class UserProfileService(): # Other user profiles

    @staticmethod
    def get_user_profile(username):

        queryset = CustomUser.objects.filter(username=username)                
        
        if not queryset.exists():
            return None
        else:
            serializer = UserProfileSerializer(queryset, many=True)

            return serializer.data  
    
    @staticmethod
    def follow_user(request, username): # bruker ikke
        user_to_follow = CustomUser.objects.get(username=username)
        
        current_user = request.user
        
        try:
            current_user.following.add(user_to_follow)
            current_user.save()
            return {
                "status":True,
                "current_user":current_user,
                "user_to_follow":user_to_follow,
            }
        except:
            return {
                "status":False,
                "current_user":current_user,
                "user_to_follow":user_to_follow,
            }
    
    @staticmethod
    def unfollow_user(request, username):
        user_to_unfollow = CustomUser.objects.get(username=username)
        
        if user_to_unfollow:
            current_user = request.user
            current_user.following.remove(user_to_unfollow)
            
            current_user.save()
            return {
                "status":True,
                "current_user":current_user,
                "user_to_unfollow":user_to_unfollow,
            }
        else:
            return None

class MyProfileService():
    
    @staticmethod
    def get_all_followers(request):
        current_user = request.user
                
        all_followers = current_user.followers.all()
        
        if all_followers.exists():
            serializer = FollowersSerializer(all_followers, many=True)
            
            return serializer
        else:
            return None