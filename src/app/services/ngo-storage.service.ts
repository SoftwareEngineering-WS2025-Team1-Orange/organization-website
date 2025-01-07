import { Injectable } from '@angular/core';
import { ReturnNGO } from '../../api';
import { NGOService } from '../mockService/nGOmock.service';

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

  constructor(storageService: NGOService) {
    this.isLoggedIn = false;
    storageService.ngoControllerGetMeV1().subscribe(
      ngo => this.ngo = ngo
    )
  }
}
