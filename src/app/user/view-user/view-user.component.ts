import { Component, OnInit } from '@angular/core';
import {PostFilterEnum} from "../../shared/post-tile/post-filter.enum";
import {CommentFilterEnum} from "../../shared/comment-tile/comment-filter.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {faEdit, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserResponse} from "../user.response";
import {AuthService} from "../../auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../user.service";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
    postFilter = PostFilterEnum.USER_POSTS;
    commentFilter = CommentFilterEnum.USER_COMMENTS;
    userName: string;
    user!: UserResponse;
    editIcon = faEdit;
    deleteIcon = faTrashAlt;
    editUserForm: FormGroup;
    showEditOverlay: boolean = false;

    constructor(private router: Router, private activateRoute: ActivatedRoute, private authService: AuthService, private userService: UserService, private toastr: ToastrService) {
        this.userName = this.activateRoute.snapshot.params['username'];
        this.editUserForm = new FormGroup({
            password: new FormControl('', Validators.required),
        });
        userService.getUser(this.userName).subscribe(data => this.user = data );
    }

    ngOnInit(): void {

    }

    isOwner(user: UserResponse): boolean {
        return this.authService.isLoggedIn() && user.userName === this.authService.getUserName();
    }

    changePassword(userName: string) {
        let password = this.editUserForm.get('password')?.value;
        this.userService.changePassword(userName, password).subscribe(() => {
            this.showOrHideEditOverlay();
            this.toastr.success('Password Updated');
            this.router.navigateByUrl('/logout');
        }, error => {
            this.toastr.error(error.error, 'Failed!', { timeOut: 5000 });
            console.log("Change password failed: " + JSON.stringify(error));
        });
    }

    deleteUser(userName: string) {
        if (!confirm("Are you sure you want to delete your account? This will permanently remove your forums, posts, comments, other comments in your posts, and other posts in your forums."))
            return;

        this.userService.deleteUser(userName).subscribe(() => {
            this.toastr.success('Account Deleted');
            this.router.navigateByUrl('/logout');
        }, error => {
            this.toastr.error(error.error, 'Failed!', { timeOut: 5000 });
            console.log("Delete account failed: " + JSON.stringify(error));
        });
    }

    showOrHideEditOverlay() {
        this.showEditOverlay = !this.showEditOverlay;
    }

}
