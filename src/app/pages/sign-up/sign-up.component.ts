import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NGOService } from '../../mockService/nGOmock.service';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatDividerModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(private service: NGOService) {}

  form = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    contact: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl(''),
  });

  register() {
    this.service.registerNGO({
      name: this.form.controls.name.value ?? '',
      address: this.form.controls.address.value ?? '',
      contact: this.form.controls.contact.value ?? '',
      mail: this.form.controls.mail.value ?? '',
      password: this.form.controls.password.value ?? '',
    });
  }
}
