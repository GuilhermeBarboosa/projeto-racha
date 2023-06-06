import { JogadorService } from 'src/app/routes/jogador.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../routes/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/dto/user';
import { UserInput } from 'src/app/interface/input/userInput';
import { RoleService } from 'src/app/routes/role.service';
import { PosicaoService } from 'src/app/routes/posicao.service';
import { Role } from 'src/app/interface/dto/role';
import { Posicao } from 'src/app/interface/dto/posicao';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  user!: User;
  roles?: Role[];
  posicao?: Posicao[];
  formulario!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe(
      (data) => {
        var roleResponse = JSON.parse(JSON.stringify(data));
        this.roles = roleResponse;

        this.createTable();
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      idade: [
        '',
        [Validators.required, Validators.min(14), Validators.max(70)],
      ],
      role: [2, Validators.required],
      posicao: [''],
      telefone: ['', Validators.required],
    });
  }

  save() {
    if (this.formulario.valid) {
      let userDTO = {
        nome: this.formulario.get('nome')?.value,
        email: this.formulario.get('email')?.value,
        senha: this.formulario.get('senha')?.value,
        idade: this.formulario.get('idade')?.value,
        telefone: this.formulario.get('telefone')?.value,
        role: this.formulario.get('role')?.value,
      };

      let userInput = new UserInput(userDTO);

      this.userService.create(userInput).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Usuário cadastrado com sucesso!');
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

  return() {
    this.router.navigateByUrl('/user');
  }
}
