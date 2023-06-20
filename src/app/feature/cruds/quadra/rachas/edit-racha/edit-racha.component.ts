import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Racha } from 'src/app/interface/dto/racha';
import { RachaInput } from 'src/app/interface/input/rachaInput';
import { RachaService } from 'src/app/routes/racha.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-edit-racha',
  templateUrl: './edit-racha.component.html',
  styleUrls: ['./edit-racha.component.css']
})
export class EditRachaComponent implements OnInit {

  formulario!: FormGroup;
  racha?: Racha;
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  idQuadra = this.activedRouter.snapshot.params['idQuadra'];
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private activedRouter: ActivatedRoute,
    private rachaService: RachaService,
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
