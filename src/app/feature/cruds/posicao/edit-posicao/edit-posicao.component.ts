import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Posicao } from 'src/app/interface/dto/posicao';
import { PosicaoInput } from 'src/app/interface/input/posicaoInput';
import { PosicaoService } from 'src/app/routes/posicao.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-edit-posicao',
  templateUrl: './edit-posicao.component.html',
  styleUrls: ['./edit-posicao.component.css'],
})
export class EditPosicaoComponent implements OnInit {
  formulario!: FormGroup;
  posicao?: Posicao;
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private activedRouter: ActivatedRoute,
    private posicaoService: PosicaoService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.posicaoService.getById(this.id).subscribe((res) => {
      var posicaoResponse = JSON.parse(JSON.stringify(res));

      posicaoResponse.created = this.utils.formatarData(
        posicaoResponse.created
      );
      posicaoResponse.updated = this.utils.formatarData(
        posicaoResponse.updated
      );

      this.posicao = posicaoResponse;
      this.createTable();
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.posicao?.id, disabled: true }],
      posicao: [
        { value: this.posicao?.posicao, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.posicao?.created, disabled: true },
        Validators.required,
      ],
      updated: [
        { value: this.posicao?.updated, disabled: true },
        Validators.required,
      ],
    });
  }

  edit() {
    if (this.formulario.valid) {
      let posicaoDTO = {
        posicao: this.formulario.get('posicao')?.value,
      };

      let posicaoInput = new PosicaoInput(posicaoDTO);

      this.posicaoService.edit(posicaoInput, this.posicao!.id!).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Posição atualizada com sucesso!');
          this.router.navigateByUrl(`/posicao`);
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
    this.router.navigateByUrl(`/posicao/info/${this.posicao?.id}`);
  }
}
