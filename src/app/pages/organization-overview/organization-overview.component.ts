import { Component, OnInit } from '@angular/core';
import { NgoStorageService } from '../../services/ngo-storage.service';
import { ApiService } from '../../services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  editNGOData,
  EditNgoDialogComponent,
} from '../../dialog/edit-ngo-dialog/edit-ngo-dialog.component';
import { AddProjectDialogComponent } from '../../dialog/add-project-dialog/add-project-dialog.component';
import { CreateProject } from '../../../api';

@Component({
  selector: 'app-organization-overview',
  standalone: true,
  imports: [MatButtonModule, NgIf, MatIconModule, RouterLink],
  templateUrl: './organization-overview.component.html',
  styleUrl: './organization-overview.component.scss',
})
export class OrganizationOverviewComponent implements OnInit {
  constructor(
    public ngoStorage: NgoStorageService,
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
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
      ngo.banner_uri = URL.createObjectURL(file);
      this.apiService.ngo.updateBannerUriNgo(ngo.id, file).then();
    }
  }

  openEditNgoDialog() {
    const ngo = this.ngoStorage.ngo;
    if (!ngo) {
      return;
    }
    const data: editNGOData = {
      name: ngo?.name ?? '',
      description: ngo?.description ?? '',
    };
    const ref = this.dialog.open(EditNgoDialogComponent, {
      data: data,
    });
    ref.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      Object.assign(ngo, result);
      this.apiService.ngo.updateNGO(ngo.id, result).then();
    });
  }

  openAddProjectDialog() {
    const ngo = this.ngoStorage.ngo;
    if (!ngo) {
      return;
    }

    const ref = this.dialog.open(AddProjectDialogComponent, {});
    ref.afterClosed().subscribe((result: CreateProject) => {
      if (!result) {
        return;
      }

      this.apiService.project.addProject(ngo.id, result).then((res) => {
        this.ngoStorage.ngo?.projects.projects.push(res.data);
      });
    });
  }
}
