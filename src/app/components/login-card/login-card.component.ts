import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {NGOService} from '../../service';
import {TokenService} from '../../service/api/token.service';
import {firstValueFrom} from 'rxjs';

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
    private router: Router,
  ) {}

  register() {
    this.ngoService.registerNGO({
      name: this.form.controls.name.value ?? '',
      address: this.form.controls.address.value ?? '',
      contact: this.form.controls.contact.value ?? '',
      email: this.form.controls.mail.value ?? '',
      password: this.form.controls.password.value ?? '',
      description: "This is an empty description",
      website_url: ""
    });
    this.router.navigate(['login']).then();
  }

  async login() {
    const token = await firstValueFrom(this.tokenService.getToken(
      this.form.controls.mail.value ?? '',
      this.form.controls.password.value ?? '',
    ));



    this.router.navigate(['overview']).then();
  }
}
