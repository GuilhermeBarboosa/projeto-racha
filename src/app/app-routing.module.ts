import { AuthGuardService } from './guards/auth-guard.service';

import { HomeComponent } from './feature/home/home.component';
import { LoginGuardService } from './guards/login-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditUserComponent } from './feature/cruds/user/edit-user/edit-user.component';
import { InfoUserComponent } from './feature/cruds/user/info-user/info-user.component';
import { ProfileComponent } from './feature/page-login/profile/profile.component';
import { UserTableComponent } from './feature/cruds/user/user-table/user-table.component';
import { CreateUserComponent } from './feature/cruds/user/create-user/create-user.component';
import { PosicaoTableComponent } from './feature/cruds/posicao/posicao-table/posicao-table.component';

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
    path: 'posicao',
    children: [
      {
        path: '',
        component: PosicaoTableComponent,
      },
      // {
      //   path: 'register',
      //   component: CreateUserComponent,
      // },
      // {
      //   path: 'edit/:id',
      //   component: EditUserComponent,
      // },
      // {
      //   path: 'info/:id',
      //   component: InfoUserComponent,
      // },
    ],
    canActivate: [LoginGuardService],
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: ProfileComponent,
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
