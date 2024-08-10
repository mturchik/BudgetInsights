import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bi-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
})
export class SelectorComponent {}
