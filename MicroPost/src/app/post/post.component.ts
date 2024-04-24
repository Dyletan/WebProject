import { Component, OnInit, } from '@angular/core';
import { Post } from '../models/post';
import { PostsService } from "../services/posts.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Category } from '../models/category';
import {Comment} from "../models/comment";
import {UserService} from "../services/user.service";
import {CommentService} from "../services/comment.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})

export class PostComponent implements OnInit {
  post: Post = {content: '', category: 0, user: 0};

  comments: Comment[] = [];
  updateMode = false;
  updatedContent = "";
  categories: Category[] = [];
  post_id: number = 0;

  constructor(private postsService: PostsService, private userService: UserService, private route: ActivatedRoute, private router: Router, private commentService: CommentService) { }

  ngOnInit() {
    this.getPost()
    this.getCategories()
    this.getComments()
  }

  getPost() {
    this.route.paramMap.subscribe((params) => {
      this.post_id = Number(params.get('post_id'));
      this.postsService.getPost(this.post_id).subscribe((post) => {
        this.post = post;
        this.updatedContent = this.post.content;
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
    if (category && category.name) {
      return category.name;
    } else {
      return 'Category Not Found';
    }
  }
  getComments() {
    this.commentService.getComments(this.post_id).subscribe(
      result => {
        this.comments = result;
      }
    )
  }

  isCurrentUserAuthor(): boolean {
    return this.post.user === this.userService.get_user_id();
  }
}
