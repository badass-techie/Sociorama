import { Component, Input, OnInit } from '@angular/core';
import { ForumService } from 'src/app/forum/forum.service';
import {ForumResponse} from "../../forum/forum.response";

@Component({
  selector: 'app-forum-side-bar',
  templateUrl: './forum-side-bar.component.html',
  styleUrls: ['./forum-side-bar.component.css']
})
export class ForumSideBarComponent implements OnInit {
  @Input() collapseList:boolean = true;

  forums!: Array<ForumResponse>;
  displayViewAll: boolean = false;

  constructor(private forumService:ForumService) {
    this.forumService.getAllForums().subscribe(data => {
      if(data.length >= 4 && this.collapseList) {
        this.forums = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.forums = data;
      }
    });
  }

  ngOnInit(): void {
  }

}
