import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from './constants';
import { ReturnNGO } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class NgoStorageService {
  isLoggedIn = false;

  ngo: ReturnNGO | null = null;

  constructor(private router: Router) {}

  login(ngo: ReturnNGO) {
    this.isLoggedIn = true;
    this.ngo = ngo;
  }

  logout() {
    this.isLoggedIn = false;
    this.ngo = null;

    localStorage.removeItem(TOKEN_KEY);

    if (this.router.url === '/overview') {
      this.router.navigate(['/']).then();
    }
  }
}
