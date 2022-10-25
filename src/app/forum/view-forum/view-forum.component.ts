import { Component, OnInit } from '@angular/core';
import {PostFilterEnum} from "../../shared/post-tile/post-filter.enum";
import {faEdit, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {ActivatedRoute, Router} from "@angular/router";
import {ForumService} from "../forum.service";
import {ForumResponse} from "../forum.response";
import {AuthService} from "../../auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.css']
})
export class ViewForumComponent implements OnInit {
    postFilter = PostFilterEnum.FORUM_POSTS;
    forum!: ForumResponse;
    editIcon = faEdit;
    deleteIcon = faTrashAlt;
    editForumForm: FormGroup;
    showEditOverlay: boolean = false;
    forumName!: string;

    constructor(private router: Router, private activateRoute: ActivatedRoute, private forumService: ForumService, private authService: AuthService, private toastr: ToastrService) {
        this.forumName = this.activateRoute.snapshot.params['forumName'];
        this.editForumForm = new FormGroup({
            text: new FormControl('', Validators.required),
        });
        this.fetchData();
        this.forumService.dataHasChanged.subscribe(() => {
            this.fetchData();
        });
    }

    ngOnInit(): void {
    }

    fetchData() {
        this.forumService.getForumByName(this.forumName).subscribe(data => this.forum = data );
    }

    isOwner(forum: ForumResponse): boolean {
        return this.authService.isLoggedIn() && forum.userName === this.authService.getUserName() || this.authService.isAdmin();
    }

    updateForumDescription(forumName: string) {
        let description = this.editForumForm.get('text')?.value;
        this.forumService.updateForumDescription(forumName, description).subscribe(() => {
            this.showOrHideEditOverlay();
            this.forumService.dataHasChanged.emit();
            this.toastr.success('Forum Changed');
        }, error => {
            this.toastr.error(error.error, 'Failed!', { timeOut: 5000 });
            console.log("Edit forum failed: " + JSON.stringify(error));
        });
    }

    deleteForum(forumName: string) {
        if (!confirm("Are you sure you want to delete this forum? This cannot be reversed"))
            return;

        this.forumService.deleteForum(forumName).subscribe(() => {
            this.forumService.dataHasChanged.emit();
            this.toastr.success('Forum Deleted');
            this.router.navigateByUrl('/');
        }, error => {
            this.toastr.error(error.error, 'Failed!', { timeOut: 5000 });
            console.log("Delete forum failed: " + JSON.stringify(error));
        });
    }

    showOrHideEditOverlay() {
        this.showEditOverlay = !this.showEditOverlay;
    }
}
