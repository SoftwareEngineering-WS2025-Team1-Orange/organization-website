import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from './constants';
import { ReturnNGO } from '../../api';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class NgoStorageService {
  isLoggedIn = false;

  ngo: ReturnNGO | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {}

  async loadNGO(){
    const req = await this.apiService.ngo.ngoControllerGetMeV1();
    this.ngo = req.data;
    this.isLoggedIn = true;
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
