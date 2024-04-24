import {Component, OnInit} from '@angular/core';
import {Post} from "../models/post";
import {Category} from "../models/category";
import {PostsService} from "../services/posts.service";
import {UserService} from "../services/user.service";
import {Comment} from "../models/comment";
import {CommentService} from "../services/comment.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit {
  comment: Comment = {user: 0, post: 0, content: ''};
  username!: string;

  constructor(private commentService: CommentService, private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUserInfo();
    this.route.paramMap.subscribe(params => {
      this.comment.post = Number(params.get('post_id'));
    });
  }

  onSubmit() {
    if (this.comment.content) {
      this.commentService.postComment(this.comment.post, this.comment).subscribe(response => {
        this.comment = {content: '', user: this.comment.user, created_at: '', post: this.comment.post};
      });
    }
  }

  getUserInfo() {
    this.comment.user = this.userService.get_user_id()

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
