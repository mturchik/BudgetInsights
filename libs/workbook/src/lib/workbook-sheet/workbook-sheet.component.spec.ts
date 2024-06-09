import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkbookSheetComponent } from './workbook-sheet.component';

describe('WorkbookSheetComponent', () => {
  let component: WorkbookSheetComponent;
  let fixture: ComponentFixture<WorkbookSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkbookSheetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkbookSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
