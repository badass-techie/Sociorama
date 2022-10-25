import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ForumService} from "../../forum/forum.service";
import {AuthService} from "../../auth/auth.service";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {CommentRequest} from "../comment.request";
import {CommentService} from "../comment.service";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
    addCommentForm: FormGroup;
    commentRequest!: CommentRequest;
    @Input() postId!: number;
    editIcon = faEdit;
    isLoggedIn: boolean;

    constructor(private router: Router, private commentService: CommentService, private toastr: ToastrService,
                private forumService: ForumService, private authService: AuthService) {
        this.isLoggedIn = authService.isLoggedIn();
        this.addCommentForm = new FormGroup({
            text: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {

    }

    addComment() {
        this.commentRequest = {
            postId: this.postId,
            text: this.addCommentForm.get('text')?.value
        }

        this.commentService.createComment(this.commentRequest).subscribe(() => {
            this.toastr.success('Comment Added');
            this.commentService.dataHasChanged.emit();
        }, error => {
            this.toastr.error(error.error, 'Failed!', { timeOut: 5000 });
            console.log("Create comment failed: " + JSON.stringify(error));
        });
    }
}
