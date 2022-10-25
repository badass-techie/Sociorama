import { Component, OnInit } from '@angular/core';
import {PostFilterEnum} from "../../shared/post-tile/post-filter.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentFilterEnum} from "../../shared/comment-tile/comment-filter.enum";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postFilter = PostFilterEnum.SPECIFIC_POST;
  commentFilter = CommentFilterEnum.POST_COMMENTS;
  postId: number;

  constructor(private router:Router, private activateRoute: ActivatedRoute) {
      this.postId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

}
