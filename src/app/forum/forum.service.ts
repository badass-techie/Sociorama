import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {ForumRequest} from './forum.request';
import {ForumResponse} from "./forum.response";

@Injectable({
    providedIn: 'root'
})
export class ForumService {
    @Output() dataHasChanged = new EventEmitter();  // notifies every component that reads data from this service that the data has changed

    constructor(private http: HttpClient) {
    }

    getAllForums(): Observable<Array<ForumResponse>> {
        return this.http.get<Array<ForumResponse>>('http://localhost:8080/api/forums/');
    }

    getForumByName(forumName: string): Observable<ForumResponse> {
        return this.http.get<ForumResponse>('http://localhost:8080/api/forums/' + forumName);
    }

    createForum(forumModel: ForumRequest): Observable<ForumRequest> {
        const httpOptions: Object = {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('basicauth') || ''
            }),
            observe: 'response',
            responseType: 'text'
        };
        return this.http.post<ForumRequest>('http://localhost:8080/api/forums/', forumModel, httpOptions);
    }

    updateForumDescription(forumName: string, newDescription: string): Observable<any> {
        const httpOptions: Object = {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('basicauth') || ''
            }),
            observe : 'response',
            responseType: 'text'
        };
        return this.http.put('http://localhost:8080/api/forums/' + forumName, newDescription, httpOptions);
    }

    deleteForum(forumName: string): Observable<any> {
        const httpOptions: Object = {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('basicauth') || ''
            }),
            observe : 'response',
            responseType: 'text'
        };
        return this.http.delete('http://localhost:8080/api/forums/' + forumName, httpOptions);
    }
}
