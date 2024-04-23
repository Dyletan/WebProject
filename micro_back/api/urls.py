from django.urls import path
from api.views.authorization import *
from api.views.category import *
from api.views.comment import *
from api.views.post import *
from api.views.user import *

urlpatterns = [
    path('register', register, name='register'),
    path('login', login, name='login'),
    path('comment', comment, name='comment'),
    path('posts', posts_list, name='posts_list'),
    path('posts/<int:pk>', post_detail, name='posts_detail'),
    path('categories', categories_list, name='categories_list'),
    path('categories/<int:pk>', category_detail, name='category_detail'),
    path('users/<int:pk>', user_detail, name='user_detail'),
]
