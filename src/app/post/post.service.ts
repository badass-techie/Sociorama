import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostResponse} from './post.response';
import {PostRequest} from "./post.request";
import {AuthService} from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    @Output() dataHasChanged = new EventEmitter();  // notifies every component that reads data from this service that the data has changed

    constructor(private http: HttpClient) {

    }

    getAllPosts(): Observable<Array<PostResponse>> {
        // we have to create the httpOptions object here rather than in the constructor, for it to update every time the function is called
        let httpOptions =  {headers: new HttpHeaders({'Authorization': sessionStorage.getItem('basicauth') || ''})};
        return this.http.get<Array<PostResponse>>('http://localhost:8080/api/posts/', httpOptions);
    }

    getPostsByUsername(name: string): Observable<Array<PostResponse>> {
        let httpOptions =  {headers: new HttpHeaders({'Authorization': sessionStorage.getItem('basicauth') || ''})};
        return this.http.get<Array<PostResponse>>('http://localhost:8080/api/posts/user/' + name, httpOptions);
    }

    getPostsByForumName(name: string): Observable<Array<PostResponse>> {
        let httpOptions =  {headers: new HttpHeaders({'Authorization': sessionStorage.getItem('basicauth') || ''})};
        return this.http.get<Array<PostResponse>>('http://localhost:8080/api/posts/forum/' + name, httpOptions);
    }

    getPost(id: number): Observable<PostResponse> {
        let httpOptions =  {headers: new HttpHeaders({'Authorization': sessionStorage.getItem('basicauth') || ''})};
        return this.http.get<PostResponse>('http://localhost:8080/api/posts/' + id, httpOptions);
    }

    createPost(postRequest: PostRequest): Observable<any> {
        const httpOptions: Object = {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('basicauth') || ''
            }),
            observe: 'response',
            responseType: 'text'
        };
        return this.http.post('http://localhost:8080/api/posts/', postRequest, httpOptions);
    }

    updatePost(postId: number, newText: string): Observable<any> {
        const httpOptions: Object = {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('basicauth') || ''
            }),
            observe : 'response',
            responseType: 'text'
        };
        return this.http.put('http://localhost:8080/api/posts/' + postId, newText === ""? " ":newText, httpOptions);
    }

    deletePost(postId: number): Observable<any> {
        const httpOptions: Object = {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('basicauth') || ''
            }),
            observe : 'response',
            responseType: 'text'
        };
        return this.http.delete('http://localhost:8080/api/posts/' + postId, httpOptions);
    }
}
