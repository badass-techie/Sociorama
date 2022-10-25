import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VoteRequest} from "./vote.request";

@Injectable({
    providedIn: 'root'
})
export class VoteService {
    constructor(private http: HttpClient) {

    }

    vote(voteRequest: VoteRequest): Observable<any> {
        const httpOptions: Object = {
            headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('basicauth') || ''
            }),
            observe: 'response',
            responseType: 'text'
        };
        return this.http.post('http://localhost:8080/api/vote/', voteRequest, httpOptions);
    }
}
