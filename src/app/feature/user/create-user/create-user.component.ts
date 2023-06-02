import { JogadorService } from 'src/app/service/jogador.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../service/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/dto/user';
import { UserInput } from 'src/app/interface/input/userInput';
import { RoleService } from 'src/app/service/role.service';
import { PosicaoService } from 'src/app/service/posicao.service';
import { Jogador } from 'src/app/interface/dto/jogador';
import { Role } from 'src/app/interface/dto/role';
import { Posicao } from 'src/app/interface/dto/posicao';
import { JogadorInput } from 'src/app/interface/input/jogadorInput';

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

  constructor(
    private router: Router,
    private userService: UserService,
    private posicaoService: PosicaoService,
    private jogadorService: JogadorService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  async ngOnInit() {
    (await this.roleService.getAll())
      .toPromise()
      .then((data) => {
        var roleResponse = JSON.parse(JSON.stringify(data));
        this.roles = roleResponse;
      })
      .then(async () => {
        this.posicaoService.getAll().subscribe((data) => {
          var posicaoResponse = JSON.parse(JSON.stringify(data));
          this.posicao = posicaoResponse;
        });
      })
      .then(async () => {
        this.createTable();
      });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      nome: ['aaaa', [Validators.required, Validators.minLength(3)]],
      email: ['aaaa@email.com', [Validators.required, Validators.email, Validators.minLength(3)]],
      senha: ['31232131', [Validators.required, Validators.minLength(3)]],
      idade: ['56', [Validators.required, Validators.min(14), Validators.max(70)]],
      role: [1, Validators.required],
      posicao: [''],
      telefone: ['3312312312', Validators.required],
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
          var userResponse = JSON.parse(JSON.stringify(data));
          this.notifier.ShowSuccess('Usuário cadastrado com sucesso!');

          if(this.formulario.get('posicao')?.value != ''){

            let JogadorDTO = {
              user: userResponse.id,
              posicao: Number(this.formulario.get('posicao')?.value),
              gols : 0,
              assistencias : 0,
            }

            console.log(JogadorDTO)

            let jogadorInput = new JogadorInput(JogadorDTO);

            this.jogadorService.create(jogadorInput).subscribe(
              (data) => {
                this.notifier.ShowSuccess('Jogador cadastrado com sucesso!');
              }
            )


          }
          // this.router.navigateByUrl('/user');
        },
        (error) => {
          this.notifier.ShowError(error.error);
        }
      );
    } else {
      this.notifier.ShowError('Formulário inválido!');
    }
  }

  return(){

  }

}
