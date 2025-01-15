import { Component } from '@angular/core';
import { LoginCardComponent } from '../../components/login-card/login-card.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [LoginCardComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {}
