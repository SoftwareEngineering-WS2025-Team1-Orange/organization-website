import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ResponseToken} from '../service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public getToken(username: string, password: string): Observable<any>{
    alert(JSON.stringify(["post NGO", username, password]));
    return new BehaviorSubject(null).asObservable();
  }
}
