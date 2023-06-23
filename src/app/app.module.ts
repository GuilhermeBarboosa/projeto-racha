import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './feature/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { DialogComponent } from './components/dialog/dialog.component';
import { ButtonGreenComponent } from './components/button-green/button-green.component';
import { ButtonRedComponent } from './components/button-red/button-red.component';
import { ButtonYellowComponent } from './components/button-yellow/button-yellow.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginService } from './routes/login.service';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { UserFormComponent } from './feature/forms/user-form/user-form.component';
import { UserTableComponent } from './feature/cruds/user/user-table/user-table.component';
import { ProfileComponent } from './feature/page-login/profile/profile.component';
import { InfoUserComponent } from './feature/cruds/user/info-user/info-user.component';
import { CreateUserComponent } from './feature/cruds/user/create-user/create-user.component';
import { EditUserComponent } from './feature/cruds/user/edit-user/edit-user.component';
import { PosicaoTableComponent } from './feature/cruds/posicao/posicao-table/posicao-table.component';
import { PosicaoFormComponent } from './feature/forms/posicao-form/posicao-form.component';
import { InfoPosicaoComponent } from './feature/cruds/posicao/info-posicao/info-posicao.component';
import { CreatePosicaoComponent } from './feature/cruds/posicao/create-posicao/create-posicao.component';
import { EditPosicaoComponent } from './feature/cruds/posicao/edit-posicao/edit-posicao.component';
import { JogadorTableComponent } from './feature/cruds/jogador/jogador-table/jogador-table.component';
import { CreateJogadorComponent } from './feature/cruds/jogador/create-jogador/create-jogador.component';
import { InfoJogadorComponent } from './feature/cruds/jogador/info-jogador/info-jogador.component';
import { JogadorFormComponent } from './feature/forms/jogador-form/jogador-form.component';
import { EditJogadorComponent } from './feature/cruds/jogador/edit-jogador/edit-jogador.component';
import { CreateQuadraComponent } from './feature/cruds/quadra/create-quadra/create-quadra.component';
import { EditQuadraComponent } from './feature/cruds/quadra/edit-quadra/edit-quadra.component';
import { QuadraTableComponent } from './feature/cruds/quadra/quadra-table/quadra-table.component';
import { InfoQuadraComponent } from './feature/cruds/quadra/info-quadra/info-quadra.component';
import { QuadraFormComponent } from './feature/forms/quadra-form/quadra-form.component';
import { TableInfoJogosComponent } from './feature/cruds/jogos/table-info-jogos/table-info-jogos.component';
import { RachaTableComponent } from './feature/cruds/quadra/rachas/racha-table/racha-table.component';
import { CreateRachaComponent } from './feature/cruds/quadra/rachas/create-racha/create-racha.component';
import { InfoRachaComponent } from './feature/cruds/quadra/rachas/info-racha/info-racha.component';
import { RachaFormComponent } from './feature/forms/racha-form/racha-form.component';
import { EditRachaComponent } from './feature/cruds/quadra/rachas/edit-racha/edit-racha.component';
import { AddRachaComponent } from './feature/cruds/quadra/rachas/add-racha/add-racha.component';
import { TableJogosComponent } from './feature/cruds/jogos/table-jogos/table-jogos.component';
import { InfoJogosComponent } from './feature/cruds/jogos/info-jogos/info-jogos.component';
import { JogoFormComponent } from './feature/forms/jogo-form/jogo-form.component';
import { EditJogosComponent } from './feature/cruds/jogos/edit-jogos/edit-jogos.component';
import { CreateJogosComponent } from './feature/cruds/jogos/create-jogos/create-jogos.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileComponent,
    // User
    UserTableComponent,
    InfoUserComponent,
    EditUserComponent,
    CreateUserComponent,
    // Posicao
    PosicaoTableComponent,
    InfoPosicaoComponent,
    CreatePosicaoComponent,
    EditPosicaoComponent,
    // Jogador
    JogadorTableComponent,
    CreateJogadorComponent,
    InfoJogadorComponent,
    EditJogadorComponent,
    //Quadra
    QuadraTableComponent,
    CreateQuadraComponent,
    EditQuadraComponent,
    InfoQuadraComponent,
    // Racha
    RachaTableComponent,
    CreateRachaComponent,
    InfoRachaComponent,
    EditRachaComponent,
    AddRachaComponent,
    //Info
    TableInfoJogosComponent,
    TableJogosComponent,
    InfoJogosComponent,
    EditJogosComponent,
    CreateJogosComponent,
    // Form
    UserFormComponent,
    PosicaoFormComponent,
    JogadorFormComponent,
    QuadraFormComponent,
    RachaFormComponent,
    JogoFormComponent,
    DialogComponent,
    ButtonGreenComponent,
    ButtonRedComponent,
    ButtonYellowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false // ao salvar, vai manter a mascara
    }),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
