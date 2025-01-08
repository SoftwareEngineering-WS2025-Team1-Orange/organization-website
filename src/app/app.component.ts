import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ApiService } from './services/api.service';
import { NgoStorageService } from './services/ngo-storage.service';
import { TOKEN_KEY } from './services/constants';
import { ResponseToken } from '../api';

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
    const tokenString = localStorage.getItem(TOKEN_KEY);

    if (!tokenString) {
      return;
    }

    const token: ResponseToken = JSON.parse(tokenString);
    this.loadUser(token).then();
  }

  async loadUser(token: ResponseToken) {
    this.apiService.setToken(token);

    const req = await this.apiService.ngo.ngoControllerGetMeV1();

    this.ngoStorage.login(req.data);
  }
}
