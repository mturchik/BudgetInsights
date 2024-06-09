import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SortEvent, SortableDirective } from './sortable/sortable.directive';

@Component({
  selector: 'bi-datatable',
  standalone: true,
  imports: [CommonModule, SortableDirective],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
})
export class DatatableComponent {
  @Input() headers: string[] = [];
  @Input() records: Record<string, string>[] = [];
  sortEvent: SortEvent = { column: '#', direction: 'asc' };

  onSort(sortEvent: SortEvent) {
    this.sortEvent = sortEvent;
  }
}
