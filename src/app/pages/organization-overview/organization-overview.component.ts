import { Component, OnInit } from '@angular/core';
import { NgoStorageService } from '../../services/ngo-storage.service';
import { ApiService } from '../../services/api.service';
import { MatButtonModule } from '@angular/material/button';
import {NgIf, NgOptimizedImage} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-overview',
  standalone: true,
  imports: [MatButtonModule, NgIf, MatIconModule, NgOptimizedImage],
  templateUrl: './organization-overview.component.html',
  styleUrl: './organization-overview.component.scss',
})
export class OrganizationOverviewComponent implements OnInit {
  imageURL: string | null = null;

  constructor(
    public ngoStorage: NgoStorageService,
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.ngoStorage.ngo) {
      this.router.navigate(['/']).then();
    }
  }

  uploadImage(event: Event) {
    const ngo = this.ngoStorage.ngo;

    const input = event.target as HTMLInputElement;
    if (ngo && input.files && input.files[0]) {
      const file = input.files[0];
      this.imageURL = URL.createObjectURL(file);

      this.apiService.ngo.updateBannerUriNgo(ngo.id, file).then();
    }
  }
}
