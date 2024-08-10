import { Route } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const shellRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@budget-insights/home').then((m) => m.homeRoutes),
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('@budget-insights/accounts').then((m) => m.accountsRoutes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('@budget-insights/settings').then((m) => m.settingsRoutes),
  },
  {
    path: 'not-found',
    loadComponent: () => NotFoundComponent,
  },
  // TODO: Add other routes here, e.g. "about", "contact", etc.
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
