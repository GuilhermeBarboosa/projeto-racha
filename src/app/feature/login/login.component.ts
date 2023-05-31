import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { VerifytokenService } from './../../shared/verifytoken.service';
import { LoginClass } from './../../shared/login-class';
import { NotifierService } from './../../shared/notifier.service';
import { LoginServiceService } from './../../service/login-service.service';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginServiceService,
              private router: Router,
              private formBuilder: FormBuilder,
              private notifier: NotifierService,
              private verifytokenService: VerifytokenService) { }

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    })

    if(localStorage.getItem('email') != null){
      this.loginForm.get('email')?.setValue(localStorage.getItem('email'));
      localStorage.removeItem('email');
    }

    this.verifytokenService.verifyJWT();
  }

  login() {

    if(this.loginForm.valid) {

      let loginClass = new LoginClass();
      loginClass.email = this.loginForm.get('email')?.value;
      loginClass.senha = this.loginForm.get('senha')?.value;

      this.loginService.login(loginClass).subscribe(
        (data) => {

          var loginResponse = JSON.parse(JSON.stringify(data));

          localStorage.setItem('token', loginResponse.token);

          this.loginService.verifyToken().subscribe(
            (data) => {
              loginResponse = JSON.parse(JSON.stringify(data));

              localStorage.setItem('userId', loginResponse.userId);
              localStorage.setItem('role', loginResponse.role);

              this.notifier.ShowSuccess('Login realizado com sucesso!');
              this.router.navigateByUrl('/home');
            }
          )
        },
        (error) => {
            this.notifier.ShowError('Usuário ou senha inválidos!');
        }

        );

    }else{
        this.notifier.ShowError('Login inválido!');
    }

  }

}
