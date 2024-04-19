import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AllPostsComponent } from "./all-posts/all-posts.component";
import { PostComponent } from './post/post.component';
import { AboutComponent } from './about/about.component';
import { AllCommentsComponent } from './all-comments/all-comments.component';

export const routes: Routes = [
  { path: 'all-posts', component: AllPostsComponent, canActivate: [AuthGuard] },
  { path: 'all-posts/:post_id', component: PostComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'all-posts', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent},
  { path: 'all-posts/:post_id/comment', component: AllCommentsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
