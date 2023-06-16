import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jogador } from 'src/app/interface/dto/jogador';
import { JogadorService } from 'src/app/routes/jogador.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-info-jogador',
  templateUrl: './info-jogador.component.html',
  styleUrls: ['./info-jogador.component.css']
})
export class InfoJogadorComponent implements OnInit {
  formulario!: FormGroup;
  jogador?: Jogador;
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  Editar = 'Editar';
  Voltar = 'Voltar';

  constructor(
    private activedRouter: ActivatedRoute,
    private jogadorService: JogadorService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.jogadorService.getById(this.id).subscribe(
      (data) => {
        var jogadorResponse = JSON.parse(JSON.stringify(data));
        this.jogador = jogadorResponse;

        this.jogador!.created = this.utils.formatarData(
          this.jogador!.created
        );
        this.jogador!.updated = this.utils.formatarData(
          this.jogador!.updated
        );

        this.createTable();
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

  createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.jogador?.id, disabled: this.isDisabled }],
      nome: [
        { value: this.jogador?.nome, disabled: this.isDisabled },
        Validators.required,
      ],
      posicao: [
        { value: this.jogador?.posicao, disabled: this.isDisabled },
        Validators.required,
      ],
      gols: [
        { value: this.jogador?.gols, disabled: this.isDisabled },
        Validators.required,
      ],
      assistencias: [
        { value: this.jogador?.assistencias, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.jogador?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.jogador?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    this.router.navigateByUrl(`jogador/edit/${this.id}`);
  }

  return(){
    this.router.navigateByUrl('/jogador');
  }

  remove() {
    this.jogadorService.delete(this.id).subscribe(
      (data) => {
        this.notifier.ShowError('Jogador removido com sucesso!');
        this.router.navigateByUrl('/jogador');
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }


}
