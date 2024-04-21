from django.contrib import admin

from .models import Category, Comment, User, Post

admin.site.register(Category)
admin.site.register(Comment)

admin.site.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user')