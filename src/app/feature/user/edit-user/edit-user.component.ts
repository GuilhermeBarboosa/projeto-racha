import { JogadorInput } from './../../../interface/input/jogadorInput';
import { PosicaoService } from './../../../service/posicao.service';
import { FormatterDateService } from './../../../shared/formatter-date.service';
import { JogadorService } from './../../../service/jogador.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Jogador } from 'src/app/interface/dto/jogador';
import { User } from 'src/app/interface/dto/user';
import { RoleService } from 'src/app/service/role.service';

import { Posicao } from 'src/app/interface/dto/posicao';
import { UserInput } from 'src/app/interface/input/userInput';
import { Role } from 'src/app/interface/dto/role';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  formulario!: FormGroup;
  jogador?: Jogador;
  user?: User;
  roles?: Role[];
  posicao?: Posicao[];
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];

  constructor(
    private activedRouter: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private jogadorService: JogadorService,
    private posicaoService: PosicaoService,
    private router: Router,
    private formatterDateService: FormatterDateService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  async ngOnInit() {
    (await this.jogadorService.getByUser(this.id))
      .toPromise()
      .then((data) => {
        var jogadorResponse = JSON.parse(JSON.stringify(data));
        this.jogador = jogadorResponse;
      })
      .catch((error) => {
        this.notifier.ShowError(error.error);
      })
      .then(async () => {
        this.roleService.getAll().subscribe((data) => {
          var roleResponse = JSON.parse(JSON.stringify(data));
          this.roles = roleResponse;
        });
      })
      .then(async () => {
        this.posicaoService.getAll().subscribe((data) => {
          var posicaoResponse = JSON.parse(JSON.stringify(data));
          this.posicao = posicaoResponse;
        });
      })
      .then(async () => {
        (await this.userService.getById(this.id))
          .toPromise()
          .then((res: any) => {
            var userResponse = JSON.parse(JSON.stringify(res));

            if (this.jogador?.posicao != null) {
              userResponse.posicao = this.jogador?.posicao;
            }

            userResponse.created = this.formatterDateService.formatarData(
              userResponse.created
            );
            userResponse.updated = this.formatterDateService.formatarData(
              userResponse.updated
            );

            this.user = userResponse;
          })
          .catch((error: any) => {
            this.notifier.ShowError(error.error);
          })
          .then(() => {
            this.createTable();
          });
      });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.user?.id, disabled: true }],
      nome: [
        { value: this.user?.nome, disabled: this.isDisabled },
        Validators.required,
      ],
      email: [
        { value: this.user?.email, disabled: this.isDisabled },
        Validators.required,
      ],
      senha: [{ value: '', disabled: this.isDisabled }, Validators.required],
      idade: [
        { value: this.user?.idade, disabled: this.isDisabled },
        Validators.required,
      ],
      role: [
        { value: this.user?.role?.id, disabled: this.isDisabled },
        Validators.required,
      ],
      posicao: [
        { value: this.jogador?.posicao?.id, disabled: this.isDisabled },
        Validators.required,
      ],
      telefone: [
        { value: this.user?.telefone, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.user?.created, disabled: true },
        Validators.required,
      ],
      updated: [
        { value: this.user?.updated, disabled: true },
        Validators.required,
      ],
    });
  }

  edit() {
    let presentError = false;

    if(this.formulario.valid){
      this.jogador!.posicao!.id = this.formulario.get('posicao')?.value;

      let userDTO = {
        nome: this.formulario.get('nome')?.value,
        idade: this.formulario.get('idade')?.value,
        telefone: this.formulario.get('telefone')?.value,
        email: this.formulario.get('email')?.value,
        senha: this.formulario.get('senha')?.value,
        posicao: this.formulario.get('posicao')?.value,
        role: this.formulario.get('role')?.value,
      };

      let jogadorDTO = {
        user: this.user!,
        posicao: this.jogador!.posicao!,
        assistencias : this.jogador!.assistencias,
        gols : this.jogador!.gols,
      };

      let userInput = new UserInput(userDTO);
      let jogadorInput = new JogadorInput(jogadorDTO);

      console.log(jogadorInput)

      this.jogadorService.edit(jogadorInput, this.jogador!.id!).toPromise().then(
        (data) => {
          this.notifier.ShowSuccess('Jogador atualizado com sucesso!');
        },
        (error) => {
          this.notifier.ShowError(error.error);
          presentError = true;
        }
      ).then(() => {
        this.userService.edit(userDTO, this.user!.id!).subscribe(
          (data) => {
            this.notifier.ShowSuccess('Usuário atualizado com sucesso!');
          },
          (error) => {
            this.notifier.ShowError(error.error);
            return;
          }
        );
      });

      console.log(presentError)
    }else{
      this.notifier.ShowInfo('Preencha todos os campos!');
    }

  }


  return(){
    this.router.navigateByUrl(`/user/info/${this.user?.id}`);
  }
}
