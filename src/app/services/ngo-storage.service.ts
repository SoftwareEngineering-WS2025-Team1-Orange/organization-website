import { Injectable } from '@angular/core';
import { ReturnNGO } from '../../api';
import { Router} from '@angular/router';
import {TOKEN_KEY} from './constants';

@Injectable({
  providedIn: 'root',
})
export class NgoStorageService {
  isLoggedIn = false;

  ngo: ReturnNGO | null = null;

  constructor(
    private router: Router,
  ) {}

  login(ngo: ReturnNGO) {
    this.isLoggedIn = true;
    this.ngo = ngo;
  }

  logout() {
    this.isLoggedIn = false;
    this.ngo = null;

    localStorage.removeItem(TOKEN_KEY);

    this.router.url;

    if(this.router.url === '/overview'){
      this.router.navigate(['/']).then();
    }


  }
}
