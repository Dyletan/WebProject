import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import {routes} from "./app.routes";

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostComponent } from './post/post.component';
import { AboutComponent } from './about/about.component';
import {PostFormComponent} from "./post-form/post-form.component";
import {CommentFormComponent} from "./comment-form/comment-form.component";

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
    AppComponent,
    AllPostsComponent,
    NavbarComponent,
    PostComponent,
    AboutComponent,
    PostFormComponent,
    CommentFormComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  exports: [
    NavbarComponent
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
