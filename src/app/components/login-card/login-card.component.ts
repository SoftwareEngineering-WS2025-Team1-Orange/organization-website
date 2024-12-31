import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NGOService} from '../../mockService/nGOmock.service';
import {NgIf} from '@angular/common';
import {TokenService} from '../../mockService/tokenmock.service';

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
  @Input() isSignUp: boolean = false;

  form = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    contact: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private ngoService: NGOService,
    private tokenService: TokenService,
  ) {}

  register() {
    this.ngoService.registerNGO({
      name: this.form.controls.name.value ?? '',
      address: this.form.controls.address.value ?? '',
      contact: this.form.controls.contact.value ?? '',
      mail: this.form.controls.mail.value ?? '',
      password: this.form.controls.password.value ?? '',
    });
  }

  login() {
    this.tokenService.getToken(
      this.form.controls.mail.value ?? '',
      this.form.controls.password.value ?? '',
    )
  }
}
