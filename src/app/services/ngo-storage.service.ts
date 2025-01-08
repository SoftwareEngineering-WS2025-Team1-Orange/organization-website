import { Injectable } from '@angular/core';
import { ReturnNGO } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class NgoStorageService {
  isLoggedIn = false;

  ngo: ReturnNGO | null = null;

  login(ngo: ReturnNGO) {
    this.isLoggedIn = true;
    this.ngo = ngo;
  }

  logout() {
    this.isLoggedIn = false;
    this.ngo = null;
  }
}
