import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jogador } from 'src/app/interface/dto/jogador';
import { Posicao } from 'src/app/interface/dto/posicao';
import { JogadorInput } from 'src/app/interface/input/jogadorInput';
import { JogadorService } from 'src/app/routes/jogador.service';
import { PosicaoService } from 'src/app/routes/posicao.service';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-edit-jogador',
  templateUrl: './edit-jogador.component.html',
  styleUrls: ['./edit-jogador.component.css']
})
export class EditJogadorComponent implements OnInit {

  formulario!: FormGroup;
  jogador?: Jogador;
  arrayPosicao?: Posicao[];
  arrayUser?: Jogador[];

  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];

  Sim = 'Sim';
  Nao = 'Não';
  Procurar = 'Procurar';

  constructor(
    private activedRouter: ActivatedRoute,
    private jogadorService: JogadorService,
    private posicaoService: PosicaoService,
    private userService: UserService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.posicaoService.getAll().subscribe((data) => {
      var posicaoResponse = JSON.parse(JSON.stringify(data));
      this.arrayPosicao = posicaoResponse;
    });

    this.jogadorService.getById(this.id).subscribe((res) => {
      var jogadorResponse = JSON.parse(JSON.stringify(res));

      jogadorResponse.created = this.utils.formatarData(
        jogadorResponse.created
      );
      jogadorResponse.updated = this.utils.formatarData(
        jogadorResponse.updated
      );

      this.jogador = jogadorResponse;
      this.createTable();
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.jogador?.id, disabled: true }],
      jogador: [
        { value: this.jogador?.nome, disabled: this.isDisabled },
        Validators.required,
      ],
      posicao: [
        { value: '', disabled: false },
        Validators.required,
      ],
      user: [
        { value: '', disabled: false },
        Validators.required,
      ],
      posicaoJogador: [
        { value: this.jogador?.posicao, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.jogador?.created, disabled: true },
        Validators.required,
      ],
      updated: [
        { value: this.jogador?.updated, disabled: true },
        Validators.required,
      ],
    });
  }

  edit() {
    if (this.formulario.valid) {
      let jogador = {
        user: this.formulario.get('user')?.value,
        posicao: this.formulario.get('posicao')?.value,
        gols: this.jogador?.gols,
        assistencias: this.jogador?.assistencias,
      };

      let jogadorInput = new JogadorInput(jogador);

      this.jogadorService.edit(jogadorInput, this.jogador!.id!).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Jogador atualizada com sucesso!');
          this.router.navigateByUrl(`/jogador`);
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
    this.router.navigateByUrl(`/jogador/info/${this.jogador?.id}`);
  }

  find(cpf: string) {
    if (cpf == '') {
      this.notifier.ShowError('Preencha o campo!');
    } else {
      this.userService.findCpf(cpf).subscribe((data) => {
        var userResponse = JSON.parse(JSON.stringify(data));
        this.arrayUser = userResponse;
      });


      if(this.arrayUser?.length == 0){
        this.notifier.ShowError('CPF não encontrado!');
      }
    }
  }

}
