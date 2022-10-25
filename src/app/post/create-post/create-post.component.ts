import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {ForumRequest} from 'src/app/forum/forum.request';
import {Router} from '@angular/router';
import {PostService} from 'src/app/post/post.service';
import {ForumService} from 'src/app/forum/forum.service';
import {AuthService} from 'src/app/auth/auth.service';
import {ToastrService} from "ngx-toastr";
import {PostRequest} from "../post.request";

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
    createPostForm: FormGroup;
    postRequest: PostRequest;
    forums!: Array<ForumRequest>;
    image: string = '';
    invalidImage = false;

    constructor(private router: Router, private postService: PostService, private toastr: ToastrService,
                private forumService: ForumService, private authService: AuthService) {
        // if not logged in, redirect to login page
        if (!authService.isLoggedIn())
            this.router.navigateByUrl('/login');

        this.postRequest = {
            postName: '',
            text: '',
            image: '',
            forumName: ''
        }

        this.createPostForm = new FormGroup({
            postName: new FormControl('', Validators.required),
            forumName: new FormControl('', Validators.required),
            text: new FormControl(''),
        });

        // populate the forums list
        this.forumService.getAllForums().subscribe(data => this.forums = data);
    }

    ngOnInit() {

    }

    createPost() {
        this.postRequest.postName = this.createPostForm.get('postName')?.value;
        this.postRequest.forumName = this.createPostForm.get('forumName')?.value;
        this.postRequest.image = this.image;
        this.postRequest.text = this.createPostForm.get('text')?.value;

        this.postService.createPost(this.postRequest).subscribe(() => {
            this.router.navigateByUrl('/');
            this.toastr.success('Post Created Successfully');
        }, error => {
            this.toastr.error(error.error, 'Failed!', {timeOut: 5000});
            console.log("Create post failed: " + JSON.stringify(error));
        });
    }

    discard() {
        if (this.createPostForm.dirty) {
            if (!confirm("Are you sure you want to discard this post?"))
                return; // don't navigate away
        }

        this.router.navigateByUrl('/');
    }

    selectImage(event: any) {
        let mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            this.invalidImage = true;
            return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (_event) => {
            this.invalidImage = false;
            if (typeof reader.result === "string") {
                this.image = reader.result;
            }
            else {
                this.invalidImage = true;
                return;
            }
        }
    }
}
