import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/dto/user';
import { JogadorRachaService } from 'src/app/routes/jogador-racha.service';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-add-racha',
  templateUrl: './add-racha.component.html',
  styleUrls: ['./add-racha.component.css'],
})
export class AddRachaComponent implements OnInit, AfterViewInit {
  arrayUser?: User[];
  length = 0;
  formulario!: FormGroup;
  Adicionar = 'Adicionar';
  Nao = 'Não';
  Procurar = 'Procurar';

  id = this.activedRouter.snapshot.params['id'];
  idQuadra = this.activedRouter.snapshot.params['idQuadra'];

  arrayJogador = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'excluir'];

  constructor(
    private activedRouter: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private jogadorRachaService: JogadorRachaService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.createTable();
  }

  ngAfterViewInit() {
    this.arrayJogador.paginator = this.paginator;
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

  async createTable() {
    this.formulario = this.formBuilder.group({
      user: ['', [Validators.required]],
    });
  }

  add() {
    if (this.arrayJogador.data.length >= 1) {
      this.arrayJogador.data.forEach((element) => {
        if (element.id == this.formulario.get('user')?.value) {
          this.notifier.ShowInfo('Jogador já adicionado!');
        } else {
          this.adicionarJogador();
        }
      });
      console.log(this.arrayJogador);
    } else {
      this.adicionarJogador();
    }

    this.arrayJogador.paginator = this.paginator;
  }

  adicionarJogador() {
    this.arrayUser?.forEach((element) => {
      if (element.id == this.formulario.get('user')?.value) {
        this.arrayJogador.data.push(element);
      }
    });
    this.createTable();
    this.length = this.arrayJogador.data.length;
  }

  deleteUser(id: number){
    this.arrayJogador.data.forEach((element, index) => {
      if (element.id == id) {
        this.arrayJogador.data.splice(index, 1);
      }
    });

    this.arrayJogador.paginator = this.paginator;
  }

  save() {
    if (this.formulario.valid) {
      // let jogador = {
      //   user: this.formulario.get('user')?.value,
      //   posicao: this.formulario.get('posicao')?.value,
      // };
      // let jogadorInput = new JogadorInput(jogador);
      // this.jogadorRachaService.create(jogadorInput).subscribe(
      //   (data) => {
      //     this.notifier.ShowSuccess('Jogador cadastrado com sucesso!');
      //     this.router.navigateByUrl('/jogador');
      //   },
      //   (error) => {
      //     this.notifier.ShowError(error.error);
      //   }
      // );
    } else {
      this.notifier.ShowError('Formulário inválido!');
    }
  }

  return() {
    this.router.navigateByUrl('/jogador');
  }
}
