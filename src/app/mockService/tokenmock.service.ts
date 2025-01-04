import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestToken } from '../service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getToken(requestToken: RequestToken): Observable<any> {
    alert(JSON.stringify(['post NGO', requestToken]));

    return new BehaviorSubject(null).asObservable();
  }
}
