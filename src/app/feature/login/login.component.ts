import { TokenJwtService } from './../../shared/token-jwt.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from './../../shared/notifier.service';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { LoginInput } from 'src/app/interface/input/loginInput';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private tokenJwtService: TokenJwtService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['gui@gmail.com', Validators.required],
      senha: ['123', Validators.required],
    });

    if (localStorage.getItem('email') != null) {
      this.loginForm.get('email')?.setValue(localStorage.getItem('email'));
      localStorage.removeItem('email');
    }
  }

  login() {
    if (this.loginForm.valid) {
      let loginInput = new LoginInput(
        this.loginForm.get('email')?.value,
        this.loginForm.get('senha')?.value
      );

      this.loginService.login(loginInput).subscribe(
        (data: any) => {
          var data = JSON.parse(JSON.stringify(data));
          console.log(data)
          this.tokenJwtService.setToken(data);
          this.notifier.ShowSuccess('Login efetuado com sucesso!');
          this.router.navigate(['/home']);
        },
        (error: any) => {
          this.notifier.ShowError(error.error);
        }
      );
    }
  }
}
