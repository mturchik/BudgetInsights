import { Component } from '@angular/core';
import { ShellComponent } from '@budget-insights/shell';

@Component({
  standalone: true,
  imports: [ShellComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
