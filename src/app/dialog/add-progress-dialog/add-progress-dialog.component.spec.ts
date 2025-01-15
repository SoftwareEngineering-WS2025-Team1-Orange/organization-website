import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgressDialogComponent } from './add-progress-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('AddProgressDialogComponent', () => {
  let component: AddProgressDialogComponent;
  let fixture: ComponentFixture<AddProgressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProgressDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProgressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
