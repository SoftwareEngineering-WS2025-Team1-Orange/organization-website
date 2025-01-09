import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNgoDialogComponent } from './edit-ngo-dialog.component';

describe('EditNgoDialogComponent', () => {
  let component: EditNgoDialogComponent;
  let fixture: ComponentFixture<EditNgoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNgoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNgoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
