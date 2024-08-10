import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationEvent } from '@budget-insights/models';

@Component({
  selector: 'bi-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() totalCount = 0;
  @Output() pageInfo$ = new EventEmitter<PaginationEvent>();
  pageSizeOptions = [10, 20, 30, 40, 50];

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (x, i) => i + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  onPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.page = Number(page);
    this.pageInfo$.emit({ page: this.page, pageSize: this.pageSize });
  }

  onPageSizeChange(pageSize: number) {
    this.page = 1;
    this.pageSize = Number(pageSize);
    this.pageInfo$.emit({ page: 1, pageSize: this.pageSize });
  }
}
