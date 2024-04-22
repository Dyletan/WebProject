import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post';
import {PostsService} from "../services/posts.service";
import {Category} from '../models/category';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Observable, forkJoin} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {UserService} from "../services/user.service";
import {UserDetails} from "../models/user_detail";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css'
})

export class AllPostsComponent implements OnInit {
  posts!: Post[];
  categories!: Category[];

  constructor(private postsService: PostsService, private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.getPosts();
    this.getCategories();
  }

  getPosts() {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts;
      posts.forEach(post => {
        this.getUser(post.user).subscribe(user => {
          post.userDetails = user;
        });
      });
    });
  }

  getCategories() {
    this.postsService.getCategories().subscribe((categories) => {
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
}
