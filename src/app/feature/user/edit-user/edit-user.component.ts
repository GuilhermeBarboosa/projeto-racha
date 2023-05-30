import { NotifierService } from 'src/app/shared/notifier.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  formulario!: FormGroup;
  id = this.activedRouter.snapshot.params['id'];

  constructor(private activedRouter: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private notifier: NotifierService) { }


  ngOnInit() {

    this.userService.getById(this.id).subscribe(
      (data) => {

        var userResponse = JSON.parse(JSON.stringify(data));

        this.formulario = this.formBuilder.group({
          nome: [userResponse.nome, Validators.required],
          email: [userResponse.email, Validators.required],
          senha: [userResponse.senha, Validators.required],
          idade: [userResponse.idade, Validators.required],
          role: [userResponse.role, Validators.required]
        })
      }
    );


  }

 edit(){
    if(this.formulario.valid) {

      let userDTO: User;

      userDTO = {
        nome: this.formulario.get('nome')?.value,
        email: this.formulario.get('email')?.value,
        senha: this.formulario.get('senha')?.value,
        idade: this.formulario.get('idade')?.value,
        role: this.formulario.get('role')?.value
      }


      this.userService.edit(userDTO, this.id).subscribe(
        (data) => {
          this.notifier.ShowInfo('Usuário editado com sucesso!');
          this.router.navigateByUrl('/user');
        },
        (error) => {
          this.notifier.ShowError(error.error);
        }
        );

    } else {
      this.notifier.ShowError('Formulário inválido!');
    }
  }

  remove(){
    this.userService.delete(this.id).subscribe(
      (data) => {
        this.notifier.ShowError('Usuário removido com sucesso!');
        this.router.navigateByUrl('/user');
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
      );
  }

}
