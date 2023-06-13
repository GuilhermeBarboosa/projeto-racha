import { AuthGuardService } from './guards/auth-guard.service';

import { CreateUserComponent } from './feature/user/create-user/create-user.component';
import { UserTableComponent } from './feature/user/user-table/user-table.component';

import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/login/login.component';
import { RegisterComponent } from './feature/register/register.component';
import { EditUserComponent } from './feature/user/edit-user/edit-user.component';
import { LoginGuardService } from './guards/login-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { InfoUserComponent } from './feature/user/info-user/info-user.component';
import { ProfileComponent } from './feature/profile/profile.component';

export const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        component: UserTableComponent,
      },
      {
        path: 'register',
        component: CreateUserComponent,
      },
      {
        path: 'edit/:id',
        component: EditUserComponent,
      },
      {
        path: 'info/:id',
        component: InfoUserComponent,
      },
    ],
    canActivate: [LoginGuardService],
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: ProfileComponent,
        // path: '',
        // loadChildren: () =>
        //   import('./modules/profile/profile.module').then(
        //     (m) => m.ProfileModule
        //   ),
      },
    ],
    canActivate: [LoginGuardService],
  },
  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
