# #  service class is a Python class that contains business logic related to a particular entity or use case.

# # Application logic. Does not directly deal with HTTP requests and responses.

# from api.serializers import PostSerializer, PostSnippetSerializer

# class PostService:
#     @staticmethod
#     def create_post()
    
    
from ..serializers import PostSerializer, PostSnippetSerializer
from ..models import Post
from django.contrib.auth import get_user_model
from .other import CustomPageNumberPagination, CustomLimitOffsetPagination

CustomUser = get_user_model()

class CreatePostService():

    @staticmethod
    def create_new_post(post_data):
        serializer = PostSerializer(data=post_data.data)
        if serializer.is_valid():
            serializer.save(author=post_data.user)
            return serializer
        else:
            return None

class PostSnippetService():
    
    @staticmethod
    def get_posts(request):
        queryset = Post.objects.all().order_by('-date_published')
        
        paginator = CustomLimitOffsetPagination() # look at other_services.py for more info
        paginated_queryset = paginator.paginate_queryset(queryset, request)

        serializer = PostSnippetSerializer(paginated_queryset, many=True)
        
        return paginator.get_paginated_response(serializer.data)
    
    

class SearchService():
    ''' gets all filtered post snippets through a post title query, in paginated response '''
    
    @staticmethod
    def get_search_result_posts(request):
        
        search_query = request.query_params.get('q', None)
        print(search_query)
        
        if search_query != None:
            search_results = Post.objects.filter(title__icontains=search_query) # filter (post title)           
                
            paginator = CustomLimitOffsetPagination() # del opp så paginator ikke blir knyttet til her
                    
            paginated_results = paginator.paginate_queryset(search_results, request)

            serializer = PostSnippetSerializer(paginated_results, many=True)
        
            return paginator.get_paginated_response(serializer.data)
        else:
            return None