import { NotifierService } from './../../shared/notifier.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService) { }

  user!: User;
  formulario!: FormGroup;

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      idade: ['', [Validators.required, Validators.min(14), Validators.max(70)]],
      role: ['', Validators.required]
    })
  }

  registrar(){
    console.log(this.formulario)

    if(this.formulario.valid) {

      let userDTO = {
        nome: this.formulario.get('nome')?.value,
        email: this.formulario.get('email')?.value,
        senha: this.formulario.get('senha')?.value,
        idade: this.formulario.get('idade')?.value,
        role: this.formulario.get('role')?.value
      }

      this.user = userDTO

      this.userService.create(this.user).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Usuário cadastrado com sucesso!');
          this.router.navigateByUrl('/login');
        },
        (error) => {
          this.notifier.ShowError(error.error);
        }


        );

    } else {
      this.formulario.markAllAsTouched();
      this.notifier.ShowError('Formulário inválido!');
    }
  }

}
