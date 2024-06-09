import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  inject,
} from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[biSortable]',
  standalone: true,
})
export class SortableDirective implements OnInit, OnChanges {
  @Input() biSortable = '';
  @Input() direction: SortDirection = '';
  @Output() sort$ = new EventEmitter<SortEvent>();
  private _el = inject(ElementRef);
  private _renderer = inject(Renderer2);
  private _sortIcon?: HTMLElement;

  ngOnInit(): void {
    this.initSortIcon();
    this.updateSortIcon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['direction'] && !changes['direction'].firstChange)
      this.updateSortIcon();
  }

  initSortIcon() {
    this._sortIcon = this._renderer.createElement('i');
    this._renderer.addClass(this._sortIcon, 'bi');
    this._renderer.appendChild(this._el.nativeElement, this._sortIcon);

    this._renderer.addClass(this._el.nativeElement, 'sortable');
    this._renderer.listen(this._el.nativeElement, 'click', (event) => {
      event.stopPropagation();
      this.rotate();
    });
  }

  updateSortIcon() {
    this._renderer.removeClass(this._sortIcon, 'bi-chevron-double-up');
    this._renderer.removeClass(this._sortIcon, 'bi-chevron-double-down');
    this._renderer.removeClass(this._sortIcon, 'bi-chevron-left');
    this._renderer.addClass(this._sortIcon, this.getSortClass());
  }

  rotate() {
    this.direction = this.getNextDirection();
    this.sort$.emit({ column: this.biSortable, direction: this.direction });
    this.updateSortIcon();
  }

  getNextDirection() {
    switch (this.direction) {
      case 'asc':
        return 'desc';
      case 'desc':
        return '';
      default:
        return 'asc';
    }
  }

  getSortClass() {
    return this.direction === 'asc'
      ? 'bi-chevron-double-up'
      : this.direction === 'desc'
      ? 'bi-chevron-double-down'
      : 'bi-chevron-left';
  }
}
