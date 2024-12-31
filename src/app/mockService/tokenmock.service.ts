import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public getToken(username: string, password: string){
    alert(JSON.stringify(["post NGO", username, password]));
  }
}
