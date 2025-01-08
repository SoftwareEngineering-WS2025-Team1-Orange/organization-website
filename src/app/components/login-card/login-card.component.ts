import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NgoStorageService } from '../../services/ngo-storage.service';
import { Configuration } from '../../../api';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss',
})
export class LoginCardComponent {
  @Input() isSignUp = false;

  form = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    contact: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl(''),
  });

  config = new Configuration({ basePath: 'preview-mainframe.sokutan.de' });

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
      client_id: 'string',
      client_secret: 'string',
    });

    this.apiService.setToken(token.data.access_token);

    const req = await this.apiService.ngo.ngoControllerGetMeV1();

    this.ngoStorage.login(req.data);
    this.router.navigate(['overview']).then();
  }
}
