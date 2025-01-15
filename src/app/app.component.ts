import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ApiService } from './services/api.service';
import { NgoStorageService } from './services/ngo-storage.service';
import { CLIENT_ID, CLIENT_SECRET, TOKEN_KEY } from './services/constants';
import { ResponseToken } from '../api';
import globalAxios from 'axios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private ngoStorage: NgoStorageService,
  ) {}

  ngOnInit(): void {
    this.initRefreshToken();
    this.loadUser().then();
  }

  initRefreshToken() {
    globalAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.status !== 401 ||
          originalRequest._retry ||
          !localStorage.getItem(TOKEN_KEY)
        ) {
          return Promise.reject(error);
        }
        originalRequest._retry = true;

        const response = await this.apiService.auth.getToken({
          grant_type: 'refresh_token',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        });
        this.apiService.setToken(response.data);
        return globalAxios(originalRequest);
      },
    );
  }

  async loadUser() {
    const tokenString = localStorage.getItem(TOKEN_KEY);

    if (!tokenString) {
      return;
    }

    const token: ResponseToken = JSON.parse(tokenString);

    this.apiService.setToken(token);

    this.ngoStorage.loadNGO().then();
  }
}
