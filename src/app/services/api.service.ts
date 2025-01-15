import { Injectable } from '@angular/core';
import {
  AuthApi,
  Configuration,
  DonationsApi,
  NGOApi,
  ProjectApi,
  ResponseToken,
} from '../../api';
import { TOKEN_KEY } from './constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  config = new Configuration({
    basePath: environment.apiURL,
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
