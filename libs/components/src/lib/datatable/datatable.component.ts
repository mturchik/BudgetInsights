import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SortableDirective } from '@budget-insights/directives';
import {
  PaginationEvent,
  SortEvent,
  VerticalLocation,
} from '@budget-insights/models';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'bi-datatable',
  standalone: true,
  imports: [CommonModule, SortableDirective, PaginationComponent],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
})
export class DatatableComponent implements OnChanges {
  @Input() title = '';
  @Input() headers: string[] = [];
  @Input() records: Record<string, string>[] = [];
  @Input() paginationLocation: VerticalLocation = 'bottom';
  sortEvent: SortEvent = { column: '', direction: 'desc' };
  paginationEvent: PaginationEvent = { page: 1, pageSize: 10 };

  displayHeaders: string[] = [];
  hiddenHeaders: string[] = [];
  displayRecords: Record<string, string>[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['headers']) this.updateHeaders();
    if (changes['records']) this.updateDisplayRecords();
  }

  onSort(sortEvent: SortEvent) {
    this.sortEvent = sortEvent;
    this.updateDisplayRecords();
  }

  onPageChange(paginationEvent: PaginationEvent) {
    this.paginationEvent = paginationEvent;
    this.updateDisplayRecords();
  }

  updateDisplayRecords() {
    const displayRecords = [...this.records];

    if (this.sortEvent.direction)
      displayRecords.sort((a, b) => {
        const column = this.sortEvent.column;
        if (!column) return 0;

        const direction = this.sortEvent.direction === 'asc' ? 1 : -1;
        const comparison = this.compareRecordValues(a[column], b[column]);
        return comparison ? direction : -direction;
      });

    const start =
      (this.paginationEvent.page - 1) * this.paginationEvent.pageSize;
    const end = Math.min(
      start + this.paginationEvent.pageSize,
      this.records.length
    );
    this.displayRecords = displayRecords.slice(start, end);
  }

  updateHeaders() {
    this.displayHeaders = [...this.headers];
    this.hiddenHeaders = [];
  }

  onRemoveHeader(header: string) {
    this.hiddenHeaders.push(header);
    this.displayHeaders = this.displayHeaders.filter((h) => h !== header);
    if (this.sortEvent.column === header) this.sortEvent.column = '';
  }

  /** Returns whether the 'a' value is greater than the 'b' value */
  compareRecordValues(a: string, b: string) {
    try {
      // Check for Number
      if (!isNaN(Number(a)) && !isNaN(Number(b))) return Number(a) > Number(b);

      // CHeck for Date
      const dateA = Date.parse(a);
      const dateB = Date.parse(b);
      if (!isNaN(dateA) && !isNaN(dateB)) return dateA > dateB;
    } catch (e) {
      // Do nothing
    }

    // Return string comparison
    const strA = a?.toLocaleLowerCase() ?? '';
    const strB = b?.toLocaleLowerCase() ?? '';
    return strA > strB;
  }
}
