import {Component, OnInit} from '@angular/core';
import { Post } from '../models/post';
import {PostsService} from "../services/posts.service";
import {CommonModule} from "@angular/common";
import {PostComponent} from "../post/post.component";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css'
})

export class AllPostsComponent implements OnInit{
  posts!: Post[];

  constructor(private postsService: PostsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
}
}
