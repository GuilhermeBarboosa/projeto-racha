import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Racha } from 'src/app/interface/dto/racha';
import { RachaService } from 'src/app/routes/racha.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-info-racha',
  templateUrl: './info-racha.component.html',
  styleUrls: ['./info-racha.component.css']
})
export class InfoRachaComponent implements OnInit {

  formulario!: FormGroup;
  racha?: Racha;
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  idQuadra = this.activedRouter.snapshot.params['idQuadra'];
  Editar = 'Editar';
  Voltar = 'Voltar';
  Adicionar = "Add Jogadores";
  constructor(
    private activedRouter: ActivatedRoute,
    private rachaService: RachaService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.rachaService.getById(this.id).subscribe(
      (data) => {
        var userResponse = JSON.parse(JSON.stringify(data));
        this.racha = userResponse;

        this.racha!.created = this.utils.formatarData(
          this.racha!.created
        );
        this.racha!.updated = this.utils.formatarData(
          this.racha!.updated
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
      id: [{ value: this.racha?.id, disabled: this.isDisabled }],
      nome: [
        { value: this.racha?.nome, disabled: this.isDisabled },
        Validators.required,
      ],
      caixa: [
        { value: this.racha?.caixa, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.racha?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.racha?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    this.router.navigateByUrl(`quadra/racha/edit/${this.id}/${this.idQuadra}`);
  }

  return(){
    this.router.navigateByUrl(`quadra/racha/${this.idQuadra}`);
  }

  add(){
    this.router.navigateByUrl(`quadra/racha/add/${this.id}/${this.idQuadra}`);
  }

  remove() {
    this.rachaService.delete(this.id).subscribe(
      (data) => {
        this.notifier.ShowError('Quadra removida com sucesso!');
        this.router.navigateByUrl(`quadra/racha/${this.idQuadra}`);
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }
}
