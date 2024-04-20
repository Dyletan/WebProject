import { Component, OnInit, } from '@angular/core';
import { Post } from '../models/post';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { PostsService } from "../services/posts.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Category } from '../models/category';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})

export class PostComponent implements OnInit {
  post!: Post;
  updateMode = false;
  updatedContent = "";
  categories: Category[] = [];

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getPost()
    this.getCategories()
  }

  getPost() {
    this.route.paramMap.subscribe((params) => {
      const post_id = Number(params.get('post_id'));
      this.postsService.getPost(post_id).subscribe((post) => {
        this.post = post;
        this.updatedContent = this.post.content;
      });
    });
  }

  updatePost() {
    this.updateMode = !this.updateMode;
  }

  removePost() {
    this.postsService.deletePost(this.post.id).subscribe(() => {
      // Navigate to home page after successful deletion
      this.router.navigate(['all-posts']);
    });
  }

  savePost() {
    this.post.content = this.updatedContent;
    this
    this.postsService.putPost(this.post).subscribe();
    this.updateMode = !this.updateMode;
  }

  getCategories() {
    this.postsService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
