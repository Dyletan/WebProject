import { Component, OnInit, } from '@angular/core';
import { Post } from '../models/post';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { PostsService } from "../services/posts.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Category } from '../models/category';
import { Observable } from 'rxjs';

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
        this.getUser(this.post.user).subscribe(user => {
          this.post.userDetails = user;
        });
      });
    });
  }

  updatePost() {
    this.updateMode = !this.updateMode;
  }

  removePost() {
    if(this.post.id) {
      this.postsService.deletePost(this.post.id).subscribe(() => {
        // Navigate to home page after successful deletion
        this.router.navigate(['all-posts']);
      });
    }
  }

  savePost() {
    const newContent = this.post.content; // Assuming this is the content from the textarea
    this.postsService.putPost({...this.post, content: newContent}).subscribe();
    this.updateMode = !this.updateMode;
  }

  getCategories() {
    this.postsService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getPostCategory(category_id: number): string {
    const category: Category | undefined = this.categories.find((category) => {
      return category.id === +category_id;
    });
    console.log()
    if (category && category.name) {
      return category.name;
    } else {
      return 'Category Not Found';
    }
  }

  getUser(userId: number): Observable<any> {
    return this.postsService.getUser(+userId);
  }

  isCurrentUserAuthor(): boolean {
    const loggedInUsername = localStorage.getItem('username');
    return loggedInUsername === this.post.userDetails?.username;
  }
}
