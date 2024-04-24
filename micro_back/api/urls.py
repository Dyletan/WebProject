from django.urls import path
from api.views.authorization import *
from api.views.category import *
from api.views.comment import *
from api.views.post import *
from api.views.user import *
from api.views.like import *

urlpatterns = [
    path('register', register, name='register'),
    path('login', login, name='login'),
    path('comments/<int:post_id>', comment, name='comment'),
    path('posts', posts_list, name='posts_list'),
    path('posts/<int:pk>', post_detail, name='posts_detail'),
    path('categories', CategoriesList.as_view(), name='categories_list'),
    path('categories/<int:pk>', CategoryDetail.as_view(), name='category_detail'),
    path('users/<int:pk>', UserDetail.as_view(), name='user_detail'),
    path('like/<int:user_id>/<int:post_id>/', like, name='like'),
]
