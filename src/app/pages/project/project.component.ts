import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgoStorageService} from '../../services/ngo-storage.service';
import {ReturnProjectWithoutFav} from '../../../api';
import {ApiService} from '../../services/api.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {EditProjectComponent, editProjectData} from '../../dialog/edit-project/edit-project.component';
import {MatDialog} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  project: ReturnProjectWithoutFav | undefined;
  imageURL = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngoStorage: NgoStorageService,
    private apiService: ApiService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const project_id: number = Number(
      this.activatedRoute.snapshot.params['id'],
    );
    const ngo = this.ngoStorage.ngo;

    const project = ngo?.projects.projects.find(
      (project) => project.id === project_id,
    );

    if (!project) {
      this.router.navigate(['/']).then();
      return;
    }

    this.project = project;
  }

  uploadImage(event: Event) {
    const ngo = this.ngoStorage.ngo;

    const input = event.target as HTMLInputElement;
    if (ngo && this.project && input.files && input.files[0]) {
      const file = input.files[0];
      this.imageURL = URL.createObjectURL(file);
      const ngoProject = ngo.projects.projects.find(
        (p) => p.id === this.project?.id,
      );
      ngoProject ? (ngoProject.banner_uri = this.imageURL) : null;

      this.apiService.project
        .projectControllerPatchProjectBannerV1(ngo.id, this.project.id, file)
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
      if (
        !result ||
        !this.ngoStorage.ngo ||
        !this.project ||
        !this.ngoStorage.ngo
      ) {
        return;
      }

      this.project = { ...this.project, ...result };

      if (!this.project) {
        return;
      }

      const index = this.ngoStorage.ngo?.projects.projects.findIndex(
        (p) => p.id === this.project?.id,
      );
      this.ngoStorage.ngo.projects.projects[index] = this.project;

      this.apiService.project
        .updateProject(this.ngoStorage.ngo.id, this.project.id, result)
        .then();
    });
  }
}
