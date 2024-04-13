import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import {routes} from "./app.routes";

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AllCommentsComponent } from './all-comments/all-comments.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AppComponent,
    CommentComponent,
    AllCommentsComponent,
    AllPostsComponent,
    NavbarComponent,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
