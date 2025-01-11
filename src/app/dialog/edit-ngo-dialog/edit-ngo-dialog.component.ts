import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-ngo-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './edit-ngo-dialog.component.html',
  styleUrl: './edit-ngo-dialog.component.scss',
})
export class EditNgoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: editNGOData) {}
}

export interface editNGOData {
  name: string;
  description: string;
}
