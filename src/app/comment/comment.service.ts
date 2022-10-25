import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentResponse} from "./comment.response";
import {CommentRequest} from "./comment.request";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
    @Output() dataHasChanged = new EventEmitter<void>();  // notifies every component that reads data from this service that the data has changed

    constructor(private http: HttpClient) {

    }

    getCommentsByUsername(username: string): Observable<Array<CommentResponse>> {
        return this.http.get<Array<CommentResponse>>('http://localhost:8080/api/comments/user/' + username);
    }

    getCommentsByPost(postId: number): Observable<Array<CommentResponse>> {
        return this.http.get<Array<CommentResponse>>('http://localhost:8080/api/comments/post/' + postId);
    }

    createComment(commentRequest: CommentRequest): Observable<any> {
        const httpOptions: Object = {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('basicauth') || ''
            }),
            observe : 'response',
            responseType: 'text'
        };
        return this.http.post('http://localhost:8080/api/comments/', commentRequest, httpOptions);
    }

    updateComment(commentId: number, newText: string): Observable<any> {
        const httpOptions: Object = {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('basicauth') || ''
            }),
            observe : 'response',
            responseType: 'text'
        };
        return this.http.put('http://localhost:8080/api/comments/' + commentId, newText, httpOptions);
    }

    deleteComment(commentId: number): Observable<any> {
        const httpOptions: Object = {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('basicauth') || ''
            }),
            observe : 'response',
            responseType: 'text'
        };
        return this.http.delete('http://localhost:8080/api/comments/' + commentId, httpOptions);
    }
}
