import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgoStorageService } from '../../services/ngo-storage.service';
import {
  ReturnPaginatedDonations,
  ReturnProjectWithoutFav,
} from '../../../api';
import { ApiService } from '../../services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  EditProjectComponent,
  editProjectData,
} from '../../dialog/edit-project/edit-project.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import {
  AddProgressDialogComponent,
  editProgressData,
} from '../../dialog/add-progress-dialog/add-progress-dialog.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    DatePipe,
    RouterLink,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  project: ReturnProjectWithoutFav | undefined;
  donations: ReturnPaginatedDonations | undefined;
  displayedColumns: string[] = ['amount', 'time'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngoStorage: NgoStorageService,
    private apiService: ApiService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const project_id = Number(this.activatedRoute.snapshot.params['id']);

    const project = this.ngoStorage.ngo?.projects.projects.find(
      (project) => project.id === project_id,
    );

    if (!project) {
      this.router.navigate(['/']).then();
      return;
    }

    this.project = project;
  }

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;

    if (this.ngoStorage.ngo && this.project && input.files && input.files[0]) {
      const file = input.files[0];
      const imgURL = URL.createObjectURL(file);
      this.project.banner_uri = imgURL;
      const ngoProject = this.ngoStorage.ngo.projects.projects.find(
        (p) => p.id === this.project?.id,
      );
      if (ngoProject) {
        ngoProject.banner_uri = imgURL;
      }

      this.apiService.project
        .projectControllerPatchProjectBannerV1(
          this.ngoStorage.ngo.id,
          this.project.id,
          file,
        )
        .then();
    }
  }

  openEditProjectDialog() {
    if (!this.project) {
      return;
    }
    const data: editProjectData = {
      name: this.project.name,
      description: this.project.description,
      category: this.project.category,
    };
    const ref = this.dialog.open(EditProjectComponent, {
      data: data,
    });
    ref.afterClosed().subscribe((result: editProjectData) => {
      if (!result || !this.ngoStorage.ngo || !this.project) {
        return;
      }

      Object.assign(this.project, result);

      this.apiService.project
        .updateProject(this.ngoStorage.ngo.id, this.project.id, result)
        .then();
    });
  }

  openAddProgressDialog() {
    if (!this.project) {
      return;
    }
    const data: editProgressData = {
      progress: this.project.progress,
    };
    const ref = this.dialog.open(AddProgressDialogComponent, {
      data: data,
    });
    ref.afterClosed().subscribe((result: editProgressData) => {
      if (!result || !this.ngoStorage.ngo || !this.project) {
        return;
      }

      Object.assign(this.project, result);

      this.apiService.project
        .updateProject(this.ngoStorage.ngo.id, this.project.id, result)
        .then();
    });
  }

  async loadDonations() {
    if (!this.ngoStorage.ngo || !this.project || this.donations) {
      return;
    }
    const response = await this.apiService.donation.getDonations(
      this.ngoStorage.ngo.id,
      undefined,
      this.project.id,
    );
    this.donations = response.data;
  }

  deleteProjekt() {
    if (!this.ngoStorage.ngo || !this.project) {
      return;
    }
    if (!confirm('Are you sure you want to delete this project?\n(Projekts can only be deleted if there are no donations or the progress is 100%)')){
      return;
    }
    this.apiService.project.deleteProject(this.ngoStorage.ngo.id, this.project.id).then(()=> {
      const removed = this.ngoStorage.ngo?.projects.projects.filter(p => p.id !== this.project?.id);
      const projects = this.ngoStorage.ngo?.projects;
      if(projects && removed){
        projects.projects = removed;
      }
      this.router.navigate(['/overview']).then();
    })
  }

  protected readonly Math = Math;
}
