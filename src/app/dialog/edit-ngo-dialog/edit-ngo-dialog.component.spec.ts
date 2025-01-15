import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNgoDialogComponent } from './edit-ngo-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditNgoDialogComponent', () => {
  let component: EditNgoDialogComponent;
  let fixture: ComponentFixture<EditNgoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNgoDialogComponent, NoopAnimationsModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(EditNgoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
