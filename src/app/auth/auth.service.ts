import {EventEmitter, Injectable, Output} from '@angular/core';
import {SignupRequest} from './signup/signup.request';
import {LoginRequest} from './login/login.request';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    @Output() loggedInOrOut = new EventEmitter<void>();  // notifies header that the user has logged in or out, to update its UI

    constructor(private http: HttpClient) {

    }

    signup(signupRequestPayload: SignupRequest): Observable<any> {
        return this.http.post('http://localhost:8080/registration/signup', signupRequestPayload, {
            responseType: 'text',
            observe: 'response'
        });
    }

    login(loginRequestPayload: LoginRequest): Observable<any> {
        return this.http.post('http://localhost:8080/validateLogin', loginRequestPayload, {
            responseType: 'text',
            observe: 'response'
        });
    }

    isLoggedIn() {
        let user = sessionStorage.getItem('username')
        return !(user === null)
    }

    isAdmin() {
        return sessionStorage.getItem('username') === 'admin';
    }

    getUserName(): string | null {
        return sessionStorage.getItem('username');
    }

    logOut() {
        sessionStorage.removeItem('basicauth')
        sessionStorage.removeItem('username');
        this.loggedInOrOut.emit();
    }
}
