import { UserInput } from './../../interface/input/userInput';
import { NotifierService } from './../../shared/notifier.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/dto/user';
import { PosicaoService } from 'src/app/service/posicao.service';
import { Posicao } from 'src/app/interface/dto/posicao';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private posicaoService : PosicaoService,
    private notifier: NotifierService) { }

  user!: User;
  formulario!: FormGroup;
  posicaoArray!: Posicao[];

  ngOnInit() {
    this.posicaoService.getAll().subscribe( (data) => {
        var posicaoResponse = JSON.parse(JSON.stringify(data));
        this.posicaoArray = posicaoResponse;
    });


    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      idade: ['', [Validators.required, Validators.min(14), Validators.max(70)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      senhaSecundaria: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.minLength(8)]],
      posicao: ['', Validators.required],
      role: [1, Validators.required]
    })
  }

  registrar(){
    if(this.formulario.get('senha')?.value != this.formulario.get('senhaSecundaria')?.value){
      this.notifier.ShowError('As senhas não coincidem!');
    }else{
      if(this.formulario.valid) {

        let userDTO = {
          nome: this.formulario.get('nome')?.value,
          idade: this.formulario.get('idade')?.value,
          telefone: this.formulario.get('telefone')?.value,
          email: this.formulario.get('email')?.value,
          senha: this.formulario.get('senha')?.value,
          posicao: this.formulario.get('posicao')?.value,
          role: this.formulario.get('role')?.value
        }

        let userInput = new UserInput(userDTO);


        this.userService.create(userInput).subscribe(
          (data) => {
            this.notifier.ShowSuccess('Usuário cadastrado com sucesso!');

            localStorage.setItem('email', userDTO.email);

            this.router.navigateByUrl('/authentication/login');
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

}
