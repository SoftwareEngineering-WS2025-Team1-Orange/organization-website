import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OrganizationOverviewComponent } from './pages/organization-overview/organization-overview.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import {ProjectComponent} from './pages/project/project.component';

export const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'overview', component: OrganizationOverviewComponent },
  { path: 'login', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'overview/project/:id', component: ProjectComponent},
  { path: '**', redirectTo: '/home' },
];
