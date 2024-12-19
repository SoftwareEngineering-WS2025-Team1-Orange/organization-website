import { NGOPost } from '../service';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export class NGOService {
  public ngoPost(nGOPost: NGOPost): Observable<HttpResponse<any>>{
    alert(["post NGO", nGOPost]);

    const res = new HttpResponse({ status: 200 });
    const sub = new BehaviorSubject(res);
    return sub.asObservable();
  }
}
