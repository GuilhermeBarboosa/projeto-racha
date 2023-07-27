import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { JogadorRacha } from 'src/app/interface/dto/jogador-racha';
import { Racha } from 'src/app/interface/dto/racha';
import { User } from 'src/app/interface/dto/user';
import { RachaInput } from 'src/app/interface/input/rachaInput';
import { JogadorRachaService } from 'src/app/routes/jogador-racha.service';
import { RachaService } from 'src/app/routes/racha.service';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';
import { JogadorService } from '../../../../../routes/jogador.service';
import { JogadorRachaInput } from 'src/app/interface/input/jogador-rachaInput';
import { empty } from 'rxjs';

@Component({
  selector: 'app-edit-racha',
  templateUrl: './edit-racha.component.html',
  styleUrls: ['./edit-racha.component.css']
})
export class EditRachaComponent implements OnInit {

  arrayUser?: User[];
  formulario!: FormGroup;
  formularioUser!: FormGroup;
  racha?: Racha;
  length = 0;
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  idQuadra = this.activedRouter.snapshot.params['idQuadra'];
  Sim = 'Sim';
  Nao = 'Não';
  Procurar = 'Procurar';
  Adicionar = 'Adicionar';

  arrayJogadorRacha = new MatTableDataSource<JogadorRacha>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'nome', 'gols', 'assistencias', 'excluir'];

  constructor(
    private activedRouter: ActivatedRoute,
    private rachaService: RachaService,
    private jogadorRachaService: JogadorRachaService,
    private jogadorService: JogadorService,
    private userService: UserService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.rachaService.getById(this.id).subscribe((res) => {
      var posicaoResponse = JSON.parse(JSON.stringify(res));

      posicaoResponse.created = this.utils.formatarData(
        posicaoResponse.created
      );
      posicaoResponse.updated = this.utils.formatarData(
        posicaoResponse.updated
      );

      this.racha = posicaoResponse;
      this.createTable();
    });

    this.jogadorRachaService.getByRacha(this.id).subscribe((data) => {
      var jogadorRachaResponse = JSON.parse(JSON.stringify(data));
      this.arrayJogadorRacha.data = jogadorRachaResponse;
    });

    this.length = this.arrayJogadorRacha.data.length;

    this.createTableUser();
  }


  async createTableUser() {
    this.formularioUser = this.formBuilder.group({
      user: ['', [Validators.required]],
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.racha?.id, disabled: true }],
      nome: [
        { value: this.racha?.nome, disabled: this.isDisabled },
        Validators.required,
      ],
      caixa: [
        { value: this.racha?.caixa, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.racha?.created, disabled: true },
        Validators.required,
      ],
      updated: [
        { value: this.racha?.updated, disabled: true },
        Validators.required,
      ],
    });
  }

  find(cpf: string) {
    if (cpf == '') {
      this.notifier.ShowError('Preencha o campo!');
    } else {
      this.userService.findCpf(cpf).subscribe((data) => {
        var userResponse = JSON.parse(JSON.stringify(data));
        this.arrayUser = userResponse;
      });

      if (this.arrayUser?.length == 0) {
        this.notifier.ShowError('CPF não encontrado!');
      }
    }
  }



  add() {

    if(this.formularioUser.get('user')?.value == ''){
      this.notifier.ShowInfo('Selecione um jogador!');
      return;
    }
    this.jogadorRachaService.getByUser(this.formularioUser.get('user')?.value).subscribe((data) => {
      var jogadorRachaResponse = JSON.parse(JSON.stringify(data));
      let object:any = null;
      jogadorRachaResponse = jogadorRachaResponse[0];

      this.arrayJogadorRacha.data.forEach((element) => {
        if(element.idJogador == jogadorRachaResponse.idJogador){
          object = jogadorRachaResponse;
        }
      });


      if(object == null){
        this.adicionarJogador(jogadorRachaResponse);
      }else{
        this.notifier.ShowInfo('Jogador já adicionado!');
      }

    });

    this.arrayJogadorRacha.paginator = this.paginator;
  }

  adicionarJogador(element: JogadorRacha) {
    this.arrayJogadorRacha.data.push(element);
    console.log(this.arrayJogadorRacha.data);
    this.createTableUser();
    this.length = this.arrayJogadorRacha.data.length;
  }

  deleteUser(id: number){
    this.arrayJogadorRacha.data.forEach((element, index) => {
      if (element.id == id) {
        this.arrayJogadorRacha.data.splice(index, 1);
      }
    });
    this.createTableUser();
    this.length = this.arrayJogadorRacha.data.length;
    this.arrayJogadorRacha.paginator = this.paginator;
  }

  edit() {
    if (this.formulario.valid) {
      let rachaDTO = {
        nome: this.formulario.get('nome')?.value,
        quadra: this.idQuadra,
        caixa: this.formulario.get('caixa')?.value,
      };

      let rachaInput = new RachaInput(rachaDTO);
      this.rachaService.edit(rachaInput, this.racha!.id!).subscribe(
        (data) => {
          let arrayJogadorRachaInput = new Array<JogadorRachaInput>();
          this.arrayJogadorRacha.data.forEach((element) => {
            let jogadorRachaDTO = {
              jogador: element.id,
              racha: this.racha?.id,
            };
            let jogadorRachaInput = new JogadorRachaInput(jogadorRachaDTO);
            arrayJogadorRachaInput.push(jogadorRachaInput);
          });


          this.jogadorRachaService.editList(arrayJogadorRachaInput, this.racha!.id!).subscribe(
            (data) => {
              console.log(data);
            }
          );


          this.notifier.ShowSuccess('Racha atualizada com sucesso!');
          this.router.navigateByUrl(`quadra/racha/info/${this.racha?.id}/${this.idQuadra}`);
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
    this.router.navigateByUrl(`quadra/racha/info/${this.racha?.id}/${this.idQuadra}`);
  }
}
