import { Component } from '@angular/core';
import {LoginCardComponent} from '../../components/login-card/login-card.component';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [LoginCardComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {}
