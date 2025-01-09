import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-ngo-dialog',
  standalone: true,
  imports: [MatDialogContent],
  templateUrl: './edit-ngo-dialog.component.html',
  styleUrl: './edit-ngo-dialog.component.scss',
})
export class EditNgoDialogComponent {}
