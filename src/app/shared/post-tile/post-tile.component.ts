import {Component, Input, OnInit} from '@angular/core';
import {PostResponse} from '../../post/post.response';
import {faCommentAlt, faEdit, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {PostService} from '../../post/post.service';
import {AuthService} from 'src/app/auth/auth.service';
import {PostFilterEnum} from "./post-filter.enum";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
    selector: 'app-post-tile',
    templateUrl: './post-tile.component.html',
    styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
    posts$: Array<PostResponse> = [];
    commentIcon = faCommentAlt;
    editIcon = faEdit;
    deleteIcon = faTrashAlt;
    editPostForm: FormGroup;
    showEditOverlay: boolean = false;
    currentPostIndex: number = -1;

    @Input() filter: PostFilterEnum = PostFilterEnum.ALL_POSTS;
    @Input() username!: string;
    @Input() forumName!: string;
    @Input() postId!: number;

    constructor(private postService: PostService, private authService: AuthService, private toastr: ToastrService, private router: Router) {
        this.editPostForm = new FormGroup({
            text: new FormControl(''),
        });

        this.postService.dataHasChanged.subscribe(() => {
            this.fetchData();
        });
    }

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData() {
        if (this.filter === PostFilterEnum.ALL_POSTS)
            this.postService.getAllPosts().subscribe(posts => this.posts$ = posts);
        else if (this.filter === PostFilterEnum.USER_POSTS)
            this.postService.getPostsByUsername(this.username).subscribe(posts => this.posts$ = posts);
        else if (this.filter === PostFilterEnum.FORUM_POSTS)
            this.postService.getPostsByForumName(this.forumName).subscribe(posts => this.posts$ = posts);
        else if (this.filter === PostFilterEnum.SPECIFIC_POST)
            this.postService.getPost(this.postId).subscribe(post => this.posts$ = [post]);
    }

    cropImage = () => this.filter != PostFilterEnum.SPECIFIC_POST;

    isOwner(post: PostResponse): boolean {
        return this.authService.isLoggedIn() && post.userName === this.authService.getUserName() || this.authService.isAdmin();
    }

    wrapPostTitle(title: string, maxWords: number = 20): string {
        if (this.filter != PostFilterEnum.SPECIFIC_POST)
            return this.truncateString(title, maxWords);

        return title;
    }

    wrapPostText(text: string, maxWords: number = 50): string {
        if (this.filter != PostFilterEnum.SPECIFIC_POST)
            return this.truncateString(text, maxWords);

        return text;
    }

    truncateString(text: string, length: number): string {
        let words = text.split(' ');

        if (words.length > length)
            return words.slice(0, length).join(" ") + "...";

        return text;
    }

    editPost(commentId: number) {
        let text = this.editPostForm.get('text')?.value;
        this.postService.updatePost(commentId, text).subscribe(() => {
            this.showEditOverlay = !this.showEditOverlay;
            this.postService.dataHasChanged.emit();
            this.toastr.success('Post Changed');
        }, error => {
            this.toastr.error(error.error, 'Failed!', {timeOut: 5000});
            console.log("Edit post failed: " + JSON.stringify(error));
        });
    }

    deletePost(commentId: number) {
        if (!confirm("Are you sure you want to delete this post? This cannot be reversed"))
            return;

        this.postService.deletePost(commentId).subscribe(() => {
            this.postService.dataHasChanged.emit();
            this.toastr.success('Post Deleted');
            this.router.navigateByUrl('/');
        }, error => {
            this.toastr.error(error.error, 'Failed!', {timeOut: 5000});
            console.log("Delete post failed: " + JSON.stringify(error));
        });
    }

    showOrHideEditOverlay(idx: number) {
        this.currentPostIndex = idx;
        this.showEditOverlay = !this.showEditOverlay;
    }
}
