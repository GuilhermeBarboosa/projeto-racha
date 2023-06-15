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
import { InfoPosicaoComponent } from './feature/cruds/posicao/info-posicao/info-posicao.component';
import { CreatePosicaoComponent } from './feature/cruds/posicao/create-posicao/create-posicao.component';
import { EditPosicaoComponent } from './feature/cruds/posicao/edit-posicao/edit-posicao.component';
import { JogadorTableComponent } from './feature/cruds/jogador/jogador-table/jogador-table.component';
import { CreateJogadorComponent } from './feature/cruds/jogador/create-jogador/create-jogador.component';

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
      {
        path: 'register',
        component: CreatePosicaoComponent,
      },
      {
        path: 'edit/:id',
        component: EditPosicaoComponent,
      },
      {
        path: 'info/:id',
        component: InfoPosicaoComponent,
      },
    ],
    canActivate: [LoginGuardService],
  },
  {
    path: 'jogador',
    children: [
      {
        path: '',
        component: JogadorTableComponent,
      },
      {
        path: 'register',
        component: CreateJogadorComponent,
      },
      // {
      //   path: 'edit/:id',
      //   component: EditPosicaoComponent,
      // },
      // {
      //   path: 'info/:id',
      //   component: InfoPosicaoComponent,
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
