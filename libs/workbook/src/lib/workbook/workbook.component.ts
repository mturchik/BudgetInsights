import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileSelectorComponent } from '@budget-insights/shared';
import { WorkbookSheetComponent } from '../workbook-sheet/workbook-sheet.component';

@Component({
  selector: 'bi-workbook',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WorkbookSheetComponent,
    FileSelectorComponent,
  ],
  templateUrl: './workbook.component.html',
  styleUrl: './workbook.component.scss',
})
export class WorkbookComponent {
  form = new FormGroup({
    files: new FormControl<FileList | null>(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(1),
    ]),
  });
}
