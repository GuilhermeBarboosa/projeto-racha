import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/feature/login/login.component';
import { RegisterComponent } from 'src/app/feature/register/register.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },

    ],

  },
];
