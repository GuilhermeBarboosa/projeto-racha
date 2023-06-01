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
    // canActivate: [LoginGuardService]
  },
  {
    path: 'user',
    component: UserTableComponent,
    // canActivate: [AuthGuardService, LoginGuardService],
  },
  {
    path: 'user/register',
    component: CreateUserComponent,
    // canActivate: [AuthGuardService, LoginGuardService],
  },
  {
    path: 'user/edit/:id',
    component: EditUserComponent,
    // canActivate: [AuthGuardService, LoginGuardService],
  },
  // {
  //   path: '',
  //   redirectTo: 'authentication/login',
  //   pathMatch: 'full',
  // },
  {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
