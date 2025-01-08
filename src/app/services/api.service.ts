import { Injectable } from '@angular/core';
import { AuthApi, Configuration, NGOApi } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  config = new Configuration({
    basePath: 'https://preview-mainframe.sokutan.de/api/v1',
  });
  ngo = new NGOApi(this.config);
  auth = new AuthApi(this.config);

  setToken(token: string) {
    this.config.accessToken = token;
    this.ngo = new NGOApi(this.config);
    this.auth = new AuthApi(this.config);
  }
}
