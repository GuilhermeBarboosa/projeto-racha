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
import { InfoJogadorComponent } from './feature/cruds/jogador/info-jogador/info-jogador.component';
import { EditJogadorComponent } from './feature/cruds/jogador/edit-jogador/edit-jogador.component';
import { CreateQuadraComponent } from './feature/cruds/quadra/create-quadra/create-quadra.component';
import { QuadraTableComponent } from './feature/cruds/quadra/quadra-table/quadra-table.component';
import { EditQuadraComponent } from './feature/cruds/quadra/edit-quadra/edit-quadra.component';
import { InfoQuadraComponent } from './feature/cruds/quadra/info-quadra/info-quadra.component';
import { TableInfoJogosComponent } from './feature/cruds/jogos/table-info-jogos/table-info-jogos.component';
import { RachaTableComponent } from './feature/cruds/quadra/rachas/racha-table/racha-table.component';
import { CreateRachaComponent } from './feature/cruds/quadra/rachas/create-racha/create-racha.component';
import { InfoRachaComponent } from './feature/cruds/quadra/rachas/info-racha/info-racha.component';
import { EditRachaComponent } from './feature/cruds/quadra/rachas/edit-racha/edit-racha.component';
import { AddRachaComponent } from './feature/cruds/quadra/rachas/add-racha/add-racha.component';
import { TableJogosComponent } from './feature/cruds/jogos/table-jogos/table-jogos.component';
import { InfoJogosComponent } from './feature/cruds/jogos/info-jogos/info-jogos.component';
import { EditJogosComponent } from './feature/cruds/jogos/edit-jogos/edit-jogos.component';

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
      {
        path: 'edit/:id',
        component: EditJogadorComponent,
      },
      {
        path: 'info/:id',
        component: InfoJogadorComponent,
      },
    ],
    canActivate: [LoginGuardService],
  },
  {
    path: 'quadra',
    children: [
      {
        path: '',
        component: QuadraTableComponent,
      },
      {
        path: 'register',
        component: CreateQuadraComponent,
      },
      {
        path: 'edit/:id',
        component: EditQuadraComponent,
      },
      {
        path: 'info/:id',
        component: InfoQuadraComponent,
      },
      {
        path: 'racha',
        children: [
          {
            path: ':id',
            component: RachaTableComponent,
          },
          {
            path: ':id/register',
            component: CreateRachaComponent,
          },
          {
            path: 'edit/:id/:idQuadra',
            component: EditRachaComponent,
          },
          {
            path: 'info/:id/:idQuadra',
            component: InfoRachaComponent,
          },
          {
            path: 'add/:id/:idQuadra',
            component: AddRachaComponent,
          },
        ],
        canActivate: [LoginGuardService],
      }
    ],
    canActivate: [LoginGuardService],
  },
  {
    path: 'jogos',
    children: [
      {
        path: '',
        component: TableInfoJogosComponent,
      },
      {
        path: 'racha/:id',
        component: TableJogosComponent,
      },
      // {
      //   path: 'register',
      //   component: CreateQuadraComponent,
      // },
      {
        path: 'edit/:id',
        component: EditJogosComponent,
      },
      {
        path: 'info/:id',
        component: InfoJogosComponent,
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
