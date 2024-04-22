import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Category } from '../models/category';
import { PostsService } from '../services/posts.service';
import {UserService} from "../services/user.service";
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post: Post = {content: '', category: '', user: 0};
  categories!: Category[];
  username!: string;


  constructor(private postService: PostsService, private userService: UserService) { }
  ngOnInit() {
    this.getCategories();
    this.getUserInfo();
  }

  onSubmit() {
    if(this.post.content) {
      this.postService.createPost(this.post).subscribe(response => {
        console.log(response);
        let user_id = this.post.user
        this.post = {content: '', category: '', user: user_id, created_at: ''};
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

  getCategories() {
    this.postService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  protected readonly localStorage = localStorage;
}


