import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Category } from '../models/category';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post: Post = {id: 0, title: '', content: '', category: { id: 0, name: '' }, user: '', created_at: ''};
  categories: Category[] = [];

  constructor(private postService: PostsService) { }

  onSubmit() {
    this.postService.createPost(this.post).subscribe(response => {
      console.log(response);
      // Reset the form
      this.post = {id: 0, title: '', content: '', category: { id: 0, name: '' }, user: '', created_at: ''};
    });
  }
  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.postService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  protected readonly localStorage = localStorage;
}


