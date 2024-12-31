import { NGOPost } from '../service';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NGOService {
  public registerNGO(nGOPost: NGOPost): Observable<HttpResponse<any>>{
    alert(JSON.stringify(["post NGO", nGOPost]));

    const res = new HttpResponse({ status: 200 });
    const sub = new BehaviorSubject(res);
    return sub.asObservable();
  }
}
