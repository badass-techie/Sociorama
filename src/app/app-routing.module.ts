import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {CreateForumComponent} from './forum/create-forum/create-forum.component';
import {CreatePostComponent} from './post/create-post/create-post.component';
import {ListForumsComponent} from './forum/list-forums/list-forums.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {ViewPostComponent} from "./post/view-post/view-post.component";
import {ViewUserComponent} from "./user/view-user/view-user.component";
import {ViewForumComponent} from "./forum/view-forum/view-forum.component";

const routes: Routes = [
    {path: '', component: HomeComponent},

    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},

    {path: 'create-forum', component: CreateForumComponent},
    {path: 'forums', component: ListForumsComponent},
    {path: 'forum/:forumName', component: ViewForumComponent},

    {path: 'create-post', component: CreatePostComponent},
    {path: 'post/:id', component: ViewPostComponent},

    {path: 'user/:username', component: ViewUserComponent},
    {path: 'logout', component: LogoutComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
