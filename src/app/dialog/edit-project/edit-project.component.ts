import {Component, Inject} from '@angular/core';
import {CreateProjectCategoryEnum, UpdateProjectDtoCategoryEnum} from '../../../api';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatDialogClose,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
})
export class EditProjectComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: editProjectData) {}

  protected readonly CreateProjectCategoryEnum = CreateProjectCategoryEnum;
  protected readonly Object = Object;
}

export interface editProjectData {
  name: string;
  description: string;
  fundraising_goal: number;
  category: UpdateProjectDtoCategoryEnum;
}
