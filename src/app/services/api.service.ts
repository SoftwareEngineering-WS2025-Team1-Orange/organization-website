import { Injectable } from '@angular/core';
import {
  AuthApi,
  Configuration,
  DonationsApi,
  NGOApi,
  ProjectApi,
} from '../../api';

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

  setToken(token: string) {
    this.config.accessToken = token;
  }
}
