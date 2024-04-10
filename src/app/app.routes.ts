import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'app',
        loadChildren: () => import('./pages/shell/shell.routes').then(m => m.SHELL_ROUTES),
    },
    {
      path: 'login',
      component: LoginComponent,
    }
];
