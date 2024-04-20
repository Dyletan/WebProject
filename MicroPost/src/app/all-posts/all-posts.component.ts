import {Component, OnInit} from '@angular/core';
import { Post } from '../models/post';
import {PostsService} from "../services/posts.service";
import { Category } from '../models/category';
import {ActivatedRoute, RouterLink} from "@angular/router";
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

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
