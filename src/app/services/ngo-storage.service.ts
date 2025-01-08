import { Injectable } from '@angular/core';
import { ReturnNGO } from '../../api';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgoStorageService {
  isLoggedIn = false;

  ngo: ReturnNGO | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  login(ngo: ReturnNGO) {
    this.isLoggedIn = true;
    this.ngo = ngo;
  }

  logout() {
    this.isLoggedIn = false;
    this.ngo = null;

    this.router.url

    if(this.router.url === '/overview'){
      this.router.navigate(['/']).then();
    }
  }
}
