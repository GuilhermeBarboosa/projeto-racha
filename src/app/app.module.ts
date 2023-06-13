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
import { HomeComponent } from './feature/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateUserComponent } from './feature/user/create-user/create-user.component';
import { NgModule } from '@angular/core';
import { DialogComponent } from './components/dialog/dialog.component';
import { InfoUserComponent } from './feature/user/info-user/info-user.component';
import { ButtonGreenComponent } from './components/button-green/button-green.component';
import { ButtonRedComponent } from './components/button-red/button-red.component';
import { ButtonYellowComponent } from './components/button-yellow/button-yellow.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginService } from './routes/login.service';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ProfileComponent } from './feature/profile/profile.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    UserTableComponent,
    ProfileComponent,
    InfoUserComponent,
    CreateUserComponent,
    DialogComponent,
    EditUserComponent,
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
