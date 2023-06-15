import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Posicao } from 'src/app/interface/dto/posicao';
import { PosicaoInput } from 'src/app/interface/input/posicaoInput';
import { PosicaoService } from 'src/app/routes/posicao.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-create-posicao',
  templateUrl: './create-posicao.component.html',
  styleUrls: ['./create-posicao.component.css'],
})
export class CreatePosicaoComponent implements OnInit {
  posicao!: Posicao;
  formulario!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private router: Router,
    private posicaoService: PosicaoService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.createTable();
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      posicao: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  save() {
    if (this.formulario.valid) {
      let posicaoDto = {
        posicao: this.formulario.get('posicao')?.value,
      };

      let posicaoInput = new PosicaoInput(posicaoDto);

      this.posicaoService.create(posicaoInput).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Posição cadastrada com sucesso!');
          this.router.navigateByUrl('/posicao');
        },
        (error) => {
          this.notifier.ShowError(error.error);
        }
      );
    } else {
      this.notifier.ShowError('Formulário inválido!');
    }
  }

  return() {
    this.router.navigateByUrl('/posicao');
  }
}
