import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-progress-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatSliderModule,
    MatDialogActions,
    MatFormFieldModule,
    MatDialogClose,
    MatDialogTitle,
    FormsModule,
  ],
  templateUrl: './add-progress-dialog.component.html',
  styleUrl: './add-progress-dialog.component.scss',
})
export class AddProgressDialogComponent {
  current: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: editProgressData) {
    this.current = data.progress;
  }

  formatLabel(value: number): string {
    return `${value}%`;
  }
}

export interface editProgressData {
  progress: number;
}
