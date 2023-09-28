from api.models import Post

class SearchService():
    ''' filters the posts that are being returned based on title and query '''
    
    @staticmethod
    def filtered_search(request):
        queryset = Post.objects.all()
        
        title_query = request.query_params.get('title', None)
        user_query = request.query_params.get('user', None)
                
        if title_query != None:
            queryset = queryset.filter(title__icontains=title_query) 
        
        if user_query != None:            
            queryset = queryset.filter(user__icontains=user_query)
        
        return queryset
                            
