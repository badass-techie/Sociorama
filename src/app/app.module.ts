import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthModule} from './auth/auth.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {ToastrModule} from 'ngx-toastr';
import {HomeComponent} from './home/home.component';
import {PostTileComponent} from './shared/post-tile/post-tile.component';
import {SideBarComponent} from './shared/side-bar/side-bar.component';
import {ForumSideBarComponent} from './shared/forum-side-bar/forum-side-bar.component';
import {VoteSectionComponent} from './shared/vote-section/vote-section.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CreateForumComponent} from './forum/create-forum/create-forum.component';
import {CreatePostComponent} from './post/create-post/create-post.component';
import {ListForumsComponent} from './forum/list-forums/list-forums.component';
import {ViewPostComponent} from './post/view-post/view-post.component';
import {CommentTileComponent} from './shared/comment-tile/comment-tile.component';
import {ViewForumComponent} from './forum/view-forum/view-forum.component';
import {ViewUserComponent} from './user/view-user/view-user.component';
import {CreateCommentComponent} from './comment/create-comment/create-comment.component';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        PostTileComponent,
        SideBarComponent,
        ForumSideBarComponent,
        VoteSectionComponent,
        CreateForumComponent,
        CreatePostComponent,
        ListForumsComponent,
        ViewPostComponent,
        CommentTileComponent,
        ViewForumComponent,
        ViewUserComponent,
        CreateCommentComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthModule,
        NgxWebstorageModule.forRoot(),
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        FontAwesomeModule,
        VirtualScrollerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
