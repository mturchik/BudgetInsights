import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  inject,
} from '@angular/core';
import { SortDirection, SortEvent } from '@budget-insights/models';

@Directive({
  selector: 'th[biSortable]',
  standalone: true,
})
export class SortableDirective implements OnInit {
  @Input() biSortable = '';
  @Output() sort$ = new EventEmitter<SortEvent>();
  private _el = inject(ElementRef);
  private _renderer = inject(Renderer2);
  private _sortIcon?: HTMLElement;
  private _direction: SortDirection = '';

  ngOnInit(): void {
    this.initSortIcon();
    this.updateSortIcon();
  }

  initSortIcon() {
    this._sortIcon = this._el.nativeElement.querySelector('i');
    if (!this._sortIcon) {
      this._sortIcon = this._renderer.createElement('i');
      this._renderer.addClass(this._sortIcon, 'bi');
      this._renderer.addClass(this._sortIcon, 'ms-2');
      this._renderer.appendChild(this._el.nativeElement, this._sortIcon);
    }

    this._renderer.addClass(this._el.nativeElement, 'sortable');
    this._renderer.listen(this._el.nativeElement, 'click', (event) => {
      event.stopPropagation();
      this.rotate();
    });
  }

  rotate() {
    this._direction = this.getNextDirection();
    this.sort$.emit({ column: this.biSortable, direction: this._direction });
    this.updateSortIcon();
  }

  getNextDirection() {
    switch (this._direction) {
      case 'asc':
        return 'desc';
      case 'desc':
        return '';
      default:
        return 'asc';
    }
  }

  updateSortIcon() {
    if (!this._sortIcon) return;

    this._renderer.removeClass(this._sortIcon, 'bi-code');
    this._renderer.removeClass(this._sortIcon, 'bi-chevron-up');
    this._renderer.removeClass(this._sortIcon, 'bi-chevron-down');

    const sortClass = this.getSortClass();
    if (sortClass) this._renderer.addClass(this._sortIcon, sortClass);
  }

  getSortClass() {
    return this._direction === 'asc'
      ? 'bi-chevron-up'
      : this._direction === 'desc'
      ? 'bi-chevron-down'
      : 'bi-code';
  }
}
