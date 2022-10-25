import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../auth.service';
import {LoginRequest} from './login.request';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginRequestPayload: LoginRequest;
    loginForm: FormGroup;

    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });

        this.loginRequestPayload = {
            username: '',
            password: ''
        };
    }

    ngOnInit() {
    }

    login() {
        this.loginRequestPayload.username = this.loginForm.get('username')?.value;
        this.loginRequestPayload.password = this.loginForm.get('password')?.value;

        this.authService.login(this.loginRequestPayload).subscribe(() => {
            sessionStorage.setItem('username', this.loginRequestPayload.username);
            let authString = 'Basic ' + btoa(this.loginRequestPayload.username + ':' + this.loginRequestPayload.password);  // will be used as authentication header for all requests
            sessionStorage.setItem('basicauth', authString);

            this.authService.loggedInOrOut.emit();
            this.router.navigateByUrl('/');
            this.toastr.success('Login Successful');
        }, error => {
            this.toastr.error(error.error, 'Login Failed!', {timeOut: 5000});
            console.log("Login failed: " + JSON.stringify(error));
        });
    }
}
