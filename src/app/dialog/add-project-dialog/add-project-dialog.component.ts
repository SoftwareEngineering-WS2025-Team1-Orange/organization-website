import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateProject, CreateProjectCategoryEnum } from '../../../api';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-project-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogClose,
    MatSelectModule,
  ],
  templateUrl: './add-project-dialog.component.html',
  styleUrl: './add-project-dialog.component.scss',
})
export class AddProjectDialogComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    fundraising_goal: new FormControl(1, [Validators.required]),
    target_date: new FormControl('', [Validators.required]),
    category: new FormControl<CreateProjectCategoryEnum>('OTHER'),
  });

  constructor(private dialogRef: MatDialogRef<AddProjectDialogComponent>) {}

  save() {
    const data: CreateProject = {
      name: this.form.controls.name.value ?? '',
      description: this.form.controls.description.value ?? '',
      fundraising_goal: this.form.controls.fundraising_goal.value ?? 0,
      target_date: this.form.controls.target_date.value ?? '',
      category: this.form.controls.category.value ?? 'OTHER',
    };
    this.dialogRef.close(data);
  }

  protected readonly CreateProjectCategoryEnum = CreateProjectCategoryEnum;
  protected readonly Object = Object;
}
