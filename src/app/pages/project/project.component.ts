import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgoStorageService } from '../../services/ngo-storage.service';
import { ReturnPaginatedDonations, ReturnProjectWithoutFav} from '../../../api';
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
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  project: ReturnProjectWithoutFav | undefined;
  donations: ReturnPaginatedDonations[] | undefined;

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
      fundraising_goal: this.project.fundraising_goal,
      category: this.project.category,
    };
    const ref = this.dialog.open(EditProjectComponent, {
      data: data,
    });
    ref.afterClosed().subscribe((result) => {
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
    this.donations = [];
    const response = await this.apiService.donation.getDonations(
      this.ngoStorage.ngo.id,
      undefined,
      this.project.id,
    );
    console.log(response);
    this.donations = response.data;
  }
}
