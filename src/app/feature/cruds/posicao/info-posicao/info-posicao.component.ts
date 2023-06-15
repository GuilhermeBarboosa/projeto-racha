import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PosicaoService } from 'src/app/routes/posicao.service';
import { UtilsService } from '../../../../shared/utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'src/app/shared/notifier.service';
import { Posicao } from 'src/app/interface/dto/posicao';

@Component({
  selector: 'app-info-posicao',
  templateUrl: './info-posicao.component.html',
  styleUrls: ['./info-posicao.component.css']
})
export class InfoPosicaoComponent implements OnInit {

  formulario!: FormGroup;
  posicao?: Posicao;
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  Editar = 'Editar';
  Voltar = 'Voltar';

  constructor(
    private activedRouter: ActivatedRoute,
    private posicaoService: PosicaoService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.posicaoService.getById(this.id).subscribe(
      (data) => {
        var userResponse = JSON.parse(JSON.stringify(data));
        this.posicao = userResponse;

        this.posicao!.created = this.utils.formatarData(
          this.posicao!.created
        );
        this.posicao!.updated = this.utils.formatarData(
          this.posicao!.updated
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
      id: [{ value: this.posicao?.id, disabled: this.isDisabled }],
      posicao: [
        { value: this.posicao?.posicao, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.posicao?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.posicao?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    this.router.navigateByUrl(`posicao/edit/${this.id}`);
  }

  return(){
    this.router.navigateByUrl('/posicao');
  }

  remove() {
    this.posicaoService.delete(this.id).subscribe(
      (data) => {
        this.notifier.ShowError('Posição removida com sucesso!');
        this.router.navigateByUrl('/posicao');
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

}
