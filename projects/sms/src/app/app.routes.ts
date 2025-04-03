import { Routes } from '@angular/router';

import { canActivateAuthRole } from '../auth-role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    loadComponent: () => import('./components/overview/overview/overview.component').then(m => m.OverviewComponent),
    canActivate: [canActivateAuthRole],
  }
];
