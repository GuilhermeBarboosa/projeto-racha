import { Posicao } from './../../../../interface/dto/posicao';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/dto/user';
import { JogadorInput } from 'src/app/interface/input/jogadorInput';
import { PosicaoInput } from 'src/app/interface/input/posicaoInput';
import { JogadorService } from 'src/app/routes/jogador.service';
import { PosicaoService } from 'src/app/routes/posicao.service';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-create-jogador',
  templateUrl: './create-jogador.component.html',
  styleUrls: ['./create-jogador.component.css'],
})
export class CreateJogadorComponent implements OnInit {
  arrayUser?: User[];
  arrayPosicao?: Posicao[];
  formulario!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';
  Procurar = 'Procurar';

  constructor(
    private router: Router,
    private userService: UserService,
    private posicaoSerive: PosicaoService,
    private jogadorService: JogadorService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {

    this.posicaoSerive.getAll().subscribe((data) => {
      var posicaoResponse = JSON.parse(JSON.stringify(data));
      this.arrayPosicao = posicaoResponse;

      console.log(this.arrayPosicao);
    });

    this.createTable();
  }

  find(cpf: string) {
    if (cpf == '') {
      this.notifier.ShowError('Preencha o campo!');
    } else {
      this.userService.findCpf(cpf).subscribe((data) => {
        var userResponse = JSON.parse(JSON.stringify(data));
        this.arrayUser = userResponse;

        console.log(this.arrayUser);
      });


      if(this.arrayUser?.length == 0){
        this.notifier.ShowError('CPF não encontrado!');
      }
    }
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      user: ['', [Validators.required]],
      posicao: ['', [Validators.required]],
    });
  }

  save() {
    if (this.formulario.valid) {
      let jogador = {
        user: this.formulario.get('user')?.value,
        posicao: this.formulario.get('posicao')?.value,
        gols : 0,
        assistencias : 0,
      };

      let jogadorInput = new JogadorInput(jogador);

      console.log(jogadorInput)

      this.jogadorService.create(jogadorInput).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Jogador cadastrado com sucesso!');
          this.router.navigateByUrl('/jogador');
        },
        (error) => {
          console.log(error)
          this.notifier.ShowError(error.error);
        }
      );
    } else {
      this.notifier.ShowError('Formulário inválido!');
    }
  }

  return() {
    this.router.navigateByUrl('/jogador');
  }
}
