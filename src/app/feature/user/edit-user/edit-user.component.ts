import { FormatterDateService } from './../../../shared/formatter-date.service';
import { Jogador } from './../../../interface/jogador';
import { JogadorService } from './../../../service/jogador.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  formulario!: FormGroup;
  jogador?: Jogador;
  user?: User;
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];

  constructor(private activedRouter: ActivatedRoute,
              private userService: UserService,
              private jogadorService: JogadorService,
              private router: Router,
              private formatterDateService: FormatterDateService,
              private formBuilder: FormBuilder,
              private notifier: NotifierService) { }


  async ngOnInit() {

    (await this.jogadorService.getByUser(this.id)).toPromise().then((data) => {
      var jogadorResponse = JSON.parse(JSON.stringify(data));
      this.jogador = jogadorResponse;
    }).catch((error) => {
      this.notifier.ShowError(error.error);
    }).then(async () => {
      (await (this.userService.getById(this.id))).toPromise().then((res: any) => {
        var userResponse = JSON.parse(JSON.stringify(res));

        if( this.jogador?.posicao != null){
          userResponse.posicao = this.jogador?.posicao;
        }

        userResponse.created = this.formatterDateService.formatarData(userResponse.created);
        userResponse.updated = this.formatterDateService.formatarData(userResponse.updated);

        this.user = userResponse;

      }).catch((error: any) => {
        this.notifier.ShowError(error.error);
      }).then(() => {
        this.createTable();
      });
    });

  }

 edit(){
    if(this.formulario.valid) {

      let userDTO: User;

      userDTO = {
        nome: this.formulario.get('nome')?.value,
        email: this.formulario.get('email')?.value,
        telefone: this.formulario.get('telefone')?.value,
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

  async createTable() {
    let value : string | undefined;

    if(this.jogador == null){
      value = "Posição não cadastrada";
    }else{
      value = this.jogador?.posicao?.posicao;
    }

    this.formulario = this.formBuilder.group({
      id: [{ value: this.user?.id, disabled: this.isDisabled}],
      nome: [{value: this.user?.nome, disabled: this.isDisabled} , Validators.required],
      email: [{ value: this.user?.email, disabled: this.isDisabled}, Validators.required],
      idade: [{ value: this.user?.idade, disabled: this.isDisabled}, Validators.required],
      role: [{ value: this.user?.role?.role, disabled: this.isDisabled}, Validators.required],
      jogador: [{ value: value, disabled: this.isDisabled}, Validators.required],
      telefone: [{ value: this.user?.telefone, disabled: this.isDisabled}, Validators.required],
      created: [{ value: this.user?.created, disabled: this.isDisabled}, Validators.required],
      updated: [{ value: this.user?.updated, disabled: this.isDisabled}, Validators.required]
    })
  }

}


