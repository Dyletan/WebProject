import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AllPostsComponent } from "./all-posts/all-posts.component";
import { PostComponent } from './post/post.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'all-posts', component: AllPostsComponent },
  { path: 'all-posts/:post_id', component: PostComponent }
];