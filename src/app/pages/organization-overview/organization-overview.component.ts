import { Component } from '@angular/core';
import {NgoStorageService} from '../../services/ngo-storage.service';

@Component({
  selector: 'app-organization-overview',
  standalone: true,
  imports: [],
  templateUrl: './organization-overview.component.html',
  styleUrl: './organization-overview.component.scss',
})
export class OrganizationOverviewComponent {
  constructor(public ngoStorage: NgoStorageService) {
  }

  protected readonly JSON = JSON;
}
