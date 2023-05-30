import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EditUserComponent } from './feature/user/edit-user/edit-user.component';
import { UserTableComponent } from './feature/user/user-table/user-table.component';
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

import { RegisterComponent } from './feature/register/register.component';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateUserComponent } from './feature/user/create-user/create-user.component';
import { ButtonAdicionarComponent } from './components/button-adicionar/button-adicionar.component';
import { ButtonExcluirComponent } from './components/button-excluir/button-excluir.component';
import { ButtonEditarComponent } from './components/button-editar/button-editar.component';
import { ButtonRegistrarComponent } from './components/button-registrar/button-registrar.component';
import { NgModule } from '@angular/core';
import { LoginServiceService } from './service/login-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    UserTableComponent,
    CreateUserComponent,
    EditUserComponent,
    ButtonAdicionarComponent,
    ButtonExcluirComponent,
    ButtonEditarComponent,
    ButtonRegistrarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
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
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
  providers: [LoginServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}