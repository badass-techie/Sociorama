import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ForumRequest } from '../forum.request';
import { ForumService } from '../forum.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.component.html',
  styleUrls: ['./create-forum.component.css']
})
export class CreateForumComponent implements OnInit {
  createForumForm: FormGroup;
  forumRequest: ForumRequest;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private forumService: ForumService, private authService: AuthService, private toastr: ToastrService) {
    // if not logged in, redirect to login page
    if (!authService.isLoggedIn())
      this.router.navigateByUrl('/login');

    this.createForumForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.forumRequest = {
      forumName: '',
      description: ''
    }
  }

  ngOnInit() {

  }

  createForum() {
    this.forumRequest.forumName = this.createForumForm.get('title')?.value;
    this.forumRequest.description = this.createForumForm.get('description')?.value;
    this.forumService.createForum(this.forumRequest).subscribe(() => {
        this.router.navigateByUrl('/forums');
        this.toastr.success('Forum Created Successfully');
    }, error => {
        this.toastr.error(error.error, 'Failed!', { timeOut: 5000 });
        console.log("Create forum failed: " + JSON.stringify(error));
    });
  }

  discard() {
    if (this.createForumForm.dirty) {
      if (!confirm("Are you sure you want to discard this forum?"))
        return; // don't navigate away
    }

    this.router.navigateByUrl('/');
  }
}
