import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { DatatableComponent } from '@budget-insights/shared';

@Component({
  selector: 'bi-workbook-sheet',
  standalone: true,
  imports: [DatatableComponent],
  templateUrl: './workbook-sheet.component.html',
  styleUrl: './workbook-sheet.component.scss',
})
export class WorkbookSheetComponent implements OnChanges, OnDestroy {
  @Input() file: File | null = null;
  processFile$?: Promise<void>;
  headers: string[] = [];
  records: Record<string, string>[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // Check if the 'file' input has changed
    if (!changes['file']) return;
    // Parse the CSV content
    this.processFile$ = this.processFile();
  }

  ngOnDestroy(): void {
    // Clean up the processFile$ promise
    this.processFile$ = undefined;
  }

  // Read and process the CSV file
  async processFile() {
    const text = await this.file?.text();
    if (!text) return; // TODO: Show an error message

    // Get the rows of the file
    const rows = text.split('\n');
    if (rows.length < 2) return; // TODO: Show an error message

    // Check if the file has a header
    this.headers = rows[0]
      .split(',')
      .map((header) => this.scrubFileString(header));
    if (this.headers.length < 1) return; // TODO: Show an error message

    // Get the data rows
    const data = rows.slice(1);
    if (data.length < 1) return; // TODO: Show an error message

    // Insert the data into the records array
    this.records = [];
    for (const row of data) {
      // Split the row into columns
      const rowData = row.split(',');
      if (rowData.length !== this.headers.length) continue;
      // Loop through the columns and create a record
      const record = this.headers.reduce((acc, key, i) => {
        // Add the key-value pair to the record
        acc[key] = this.scrubFileString(rowData[i]);
        return acc;
      }, {} as Record<string, string>);
      this.records.push(record);
    }
  }

  scrubFileString(str?: string): string {
    if (!str) return '';
    return (
      str
        // Remove any double quotes
        .replace(/"/g, '')
        // Remove leading and trailing whitespace
        .trim()
        // Remove trailing slashes
        .replace(/\/$/, '')
    );
  }
}
