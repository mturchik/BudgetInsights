import { Route } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const shellRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@budget-insights/home').then((m) => m.homeRoutes),
  },
  {
    path: 'workbook',
    loadChildren: () =>
      import('@budget-insights/workbook').then((m) => m.workbookRoutes),
  },
  {
    path: 'not-found',
    loadComponent: () => NotFoundComponent,
  },
  // TODO: Add other routes here, e.g. "about", "contact", etc.
  // TODO: Add "not found" route here, e.g. "Page not found"
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
