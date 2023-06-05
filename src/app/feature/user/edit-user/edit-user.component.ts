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
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private activedRouter: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private formatterDateService: FormatterDateService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe((data) => {
      var roleResponse = JSON.parse(JSON.stringify(data));
      this.roles = roleResponse;
    });

    this.userService.getById(this.id).subscribe((res) => {
      var userResponse = JSON.parse(JSON.stringify(res));

      userResponse.created = this.formatterDateService.formatarData(
        userResponse.created
      );
      userResponse.updated = this.formatterDateService.formatarData(
        userResponse.updated
      );

      this.user = userResponse;

      this.createTable();
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
    if (this.formulario.valid) {
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

      let userInput = new UserInput(userDTO);

      this.userService.edit(userInput, this.user!.id!).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Usuário atualizado com sucesso!');
          this.router.navigateByUrl(`/user`);
        },
        (error) => {
          this.notifier.ShowError(error.error);
          return;
        }
      );
    } else {
      this.notifier.ShowInfo('Preencha todos os campos!');
    }
  }

  return() {
    this.router.navigateByUrl(`/user/info/${this.user?.id}`);
  }
}
