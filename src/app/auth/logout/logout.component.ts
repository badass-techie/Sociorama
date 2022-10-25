import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {

    }

    ngOnInit(): void {
        this.authService.logOut();
        this.toastr.success("Signed Out!");
        this.router.navigateByUrl('/');
    }

}
