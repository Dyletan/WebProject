import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AllPostsComponent } from "./all-posts/all-posts.component";
import { PostComponent } from './post/post.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: 'all-posts', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'all-posts', component: AllPostsComponent },
  { path: 'all-posts/:post_id', component: PostComponent },
  { path: 'about', component: AboutComponent}
];