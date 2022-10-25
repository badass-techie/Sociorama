import {Component, Input, OnInit} from '@angular/core';
import {CommentResponse} from "../../comment/comment.response";
import {faEdit, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {CommentFilterEnum} from "./comment-filter.enum";
import {CommentService} from "../../comment/comment.service";
import {AuthService} from "../../auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-comment-tile',
  templateUrl: './comment-tile.component.html',
  styleUrls: ['./comment-tile.component.css']
})
export class CommentTileComponent implements OnInit {
    comments$: Array<CommentResponse> = [];
    editIcon = faEdit;
    deleteIcon = faTrashAlt;
    editCommentForm: FormGroup;
    showEditOverlay: boolean = false;
    currentCommentIndex: number = -1;

    @Input() filter!: CommentFilterEnum;
    @Input() username!: string;
    @Input() postId!: number;

    constructor(private commentService: CommentService, private authService: AuthService, private toastr: ToastrService, private router: Router) {
        this.editCommentForm = new FormGroup({
            text: new FormControl('', Validators.required),
        });

        this.commentService.dataHasChanged.subscribe(() => {
            this.fetchData();
        });
    }

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData() {
        if (this.filter === CommentFilterEnum.USER_COMMENTS)
            this.commentService.getCommentsByUsername(this.username).subscribe(comments => this.comments$ = comments);
        else if (this.filter === CommentFilterEnum.POST_COMMENTS)
            this.commentService.getCommentsByPost(this.postId).subscribe(comments => this.comments$ = comments);
    }

    isOwner(comment: CommentResponse): boolean {
        return this.authService.isLoggedIn() && comment.userName === this.authService.getUserName() || this.authService.isAdmin();
    }

    editComment(commentId: number) {
        let text = this.editCommentForm.get('text')?.value;
        this.commentService.updateComment(commentId, text).subscribe(() => {
            this.showEditOverlay = !this.showEditOverlay;
            this.commentService.dataHasChanged.emit();
            this.toastr.success('Comment Changed');
        }, error => {
            this.toastr.error(error.error, 'Failed!', { timeOut: 5000 });
            console.log("Edit comment failed: " + JSON.stringify(error));
        });
    }

    deleteComment(commentId: number) {
        if (!confirm("Are you sure you want to delete this comment?"))
            return;

        this.commentService.deleteComment(commentId).subscribe(() => {
            this.commentService.dataHasChanged.emit();
            this.toastr.success('Comment Deleted');
        }, error => {
            this.toastr.error(error.error, 'Failed!', { timeOut: 5000 });
            console.log("Delete comment failed: " + JSON.stringify(error));
        });
    }

    showOrHideEditOverlay(idx: number) {
        this.currentCommentIndex = idx;
        this.showEditOverlay = !this.showEditOverlay;
    }
}
