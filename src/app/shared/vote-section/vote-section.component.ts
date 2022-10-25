import {Component, Input, OnInit} from '@angular/core';
import {PostResponse} from '../../post/post.response';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {VoteService} from "../../vote/vote.service";
import {PostService} from "../../post/post.service";
import {ToastrService} from "ngx-toastr";
import {VoteRequest} from "../../vote/vote.request";
import {VoteTypeEnum} from "../../vote/vote-type.enum";

@Component({
    selector: 'app-vote-button',
    templateUrl: './vote-section.component.html',
    styleUrls: ['./vote-section.component.css']
})
export class VoteSectionComponent implements OnInit {
    @Input() post!: PostResponse;
    upIcon = faAngleUp;
    downIcon = faAngleDown;
    upvoteColor!: string;
    downvoteColor!: string;
    voteCountColor!: string;

    constructor(private router: Router, private authService: AuthService, private voteService: VoteService,
                private postService: PostService, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.mapData();
        this.postService.dataHasChanged.subscribe(() => {
            this.mapData();
        });

    }

    public mapData() {
        this.upvoteColor = this.post.upVote ? '#007bff' : '#454545';
        this.downvoteColor = this.post.downVote ? '#ff0000' : '#454545';
        this.voteCountColor = this.post.voteCount > 0 ? '#007bff' : this.post.voteCount < 0 ? '#ff0000' : '#aaa';
    }

    upvotePost() {
        let voteRequest = new VoteRequest();
        voteRequest.voteType = VoteTypeEnum.UPVOTE;
        voteRequest.postId = this.post.postId;

        // if not logged in, redirect to login page
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/login');
            return;
        }

        this.voteService.vote(voteRequest).subscribe(data => {
            this.toastr.success('Upvoted', '', { timeOut: 1000 });
            this.postService.dataHasChanged.emit();
        }, error => {
            this.toastr.error(error.error, 'Failed!', { timeOut: 3000 });
            console.log("Upvote post failed: " + JSON.stringify(error));
        });
    }

    downvotePost() {
        let voteRequest = new VoteRequest();
        voteRequest.voteType = VoteTypeEnum.DOWNVOTE;
        voteRequest.postId = this.post.postId;

        // if not logged in, redirect to login page
        if (!this.authService.isLoggedIn()){
            this.router.navigateByUrl('/login');
            return;
        }

        this.voteService.vote(voteRequest).subscribe(data => {
            this.toastr.success('Downvoted', '', { timeOut: 1000 });
            this.postService.dataHasChanged.emit();
        }, error => {
            this.toastr.error(error.error, 'Failed!', { timeOut: 3000 });
            console.log("Downvote post failed: " + JSON.stringify(error));
        });
    }
}
