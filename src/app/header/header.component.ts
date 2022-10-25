import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    user!: string | null;
    public isLoggedIn!: boolean;

    constructor(private authService: AuthService) {
        this.fetchData();

        // update the header when the user logs in or out
        authService.loggedInOrOut.subscribe(() => {
            this.fetchData();
        });
    }

    fetchData() {
        this.user = this.authService.getUserName();
        this.isLoggedIn = this.authService.isLoggedIn();
    }

    ngOnInit(): void {
    }
}
