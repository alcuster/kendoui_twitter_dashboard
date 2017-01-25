import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class TwitterService {

  constructor(private http: Http) { }

  getTweets(): Observable<any> {
    return this.http.get('/api/tweets')
                    .map(this.extractTweetData)
                    .catch(this.handleError);
  }

  private extractTweetData(res: Response) {
    let body;

   // check if empty, before call json
   if (res.text()) {
       body = res.json();
   }
   return body || {};
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
