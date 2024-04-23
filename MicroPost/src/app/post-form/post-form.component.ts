import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post';
import {Category} from '../models/category';
import {PostsService} from '../services/posts.service';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})

export class PostFormComponent implements OnInit {
  post: Post = {content: '', category: 0, user: 0};
  categories!: Category[];
  username!: string;

  constructor(private postService: PostsService, private userService: UserService) {
  }

  ngOnInit() {
    this.getCategories();
    this.getUserInfo();
  }

  getCategories() {
    this.postService.getCategories().subscribe(categories => {
      this.categories = categories;
      if (this.categories.length > 0 && this.categories[0].id) {
        this.post.category = this.categories[0].id;
      }
    });
  }

  onSubmit() {
    if (this.post.content) {
      this.postService.createPost(this.post).subscribe(response => {
        this.post = {content: '', category: this.post.category, user: this.post.user, created_at: ''};
      });
    }
  }

  getUserInfo() {
    this.post.user = this.userService.get_user_id()

    this.userService.get_username().subscribe(
      (response) => {
        this.username = response.username;
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
  }
}


