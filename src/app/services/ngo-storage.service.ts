import { Injectable } from '@angular/core';
import {NGOGet} from '../service/model/nGOGet';
import {ReturnNGO} from '../service';

@Injectable({
  providedIn: 'root'
})
export class NgoStorageService {

  isLoggedIn: boolean = false;

  ngo: ReturnNGO | null = null;

  login(ngo: ReturnNGO){
    this.isLoggedIn = true;
    this.ngo = ngo;
  }
}
