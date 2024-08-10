import { Route } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';

export const accountsRoutes: Route[] = [
  { path: '', title: 'BI - Accounts', component: AccountsComponent },
];
