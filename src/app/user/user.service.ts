import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserResponse} from "./user.response";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getUser(username: string): Observable<UserResponse> {
        return this.http.get<UserResponse>('http://localhost:8080/api/user/' + username);
    }

    changePassword(username: string, newPassword: string): Observable<any> {
        const httpOptions: Object = {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('basicauth') || ''
            }),
            observe: 'response',
            responseType: 'text'
        };
        return this.http.put('http://localhost:8080/api/user/' + username, newPassword, httpOptions);
    }

    deleteUser(username: string): Observable<any> {
        const httpOptions: Object = {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('basicauth') || ''
            }),
            observe: 'response',
            responseType: 'text'
        };
        return this.http.delete('http://localhost:8080/api/user/' + username, httpOptions);
    }
}
