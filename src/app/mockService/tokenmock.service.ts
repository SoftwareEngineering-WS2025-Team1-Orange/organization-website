import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RequestToken} from '../service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getToken(requestToken: RequestToken): Observable<any>{
    alert(JSON.stringify(["post NGO", requestToken]));
    return new BehaviorSubject(null).asObservable();
  }
}
