import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NgoStorageService } from '../../services/ngo-storage.service';
import { ApiService } from '../../services/api.service';
import { CLIENT_ID, CLIENT_SECRET } from '../../services/constants';
import { RequestTokenScopeEnum } from '../../../api';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule,
  ],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss',
})
export class LoginCardComponent {
  @Input() isSignUp = false;
  showPassword = false;

  form = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    contact: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private ngoStorage: NgoStorageService,
    private apiService: ApiService,
  ) {}

  async register() {
    await this.apiService.ngo.registerNGO({
      name: this.form.controls.name.value ?? '',
      address: this.form.controls.address.value ?? '',
      contact: this.form.controls.contact.value ?? '',
      email: this.form.controls.mail.value ?? '',
      password: this.form.controls.password.value ?? '',
      description: 'This is an empty description',
      website_url: '',
    });
    this.router.navigate(['login']).then();
  }

  async login() {
    const token = await this.apiService.auth.getToken({
      username: this.form.controls.mail.value ?? '',
      password: this.form.controls.password.value ?? '',
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: Object.values(RequestTokenScopeEnum),
    });

    this.apiService.setToken(token.data);

    this.ngoStorage
      .loadNGO()
      .then(() => this.router.navigate(['overview']).then());
  }
}
