import { Route } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';

export const settingsRoutes: Route[] = [
  { path: '', title: 'BI - Settings', component: SettingsComponent },
];
