import { Injectable } from '@angular/core';
import {
  AuthApi,
  Configuration,
  DonationsApi,
  NGOApi,
  ProjectApi, ResponseToken,
} from '../../api';
import {TOKEN_KEY} from './constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  config = new Configuration({
    basePath: 'https://preview-mainframe.sokutan.de/api/v1',
  });
  ngo = new NGOApi(this.config);
  auth = new AuthApi(this.config);
  project = new ProjectApi(this.config);
  donation = new DonationsApi(this.config);

  setToken(token: ResponseToken) {
    this.config.accessToken = token.access_token;
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }
}
