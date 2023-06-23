import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jogo } from 'src/app/interface/dto/jogo';
import { JogoInput } from 'src/app/interface/input/jogoInput';
import { JogoService } from 'src/app/routes/jogo.service';
import { PosicaoService } from 'src/app/routes/posicao.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from '../../../../shared/utils.service';

@Component({
  selector: 'app-create-jogos',
  templateUrl: './create-jogos.component.html',
  styleUrls: ['./create-jogos.component.css'],
})
export class CreateJogosComponent implements OnInit {
  jogo!: Jogo;
  formulario!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';
  idRacha = this.activedRouter.snapshot.params['id'];

  constructor(
    private router: Router,
    private jogoService: JogoService,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private activedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createTable();
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      valorPago: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });
  }

  save() {
    if (this.formulario.valid) {

      if(this.formulario.get('data')?.value > this.utils.formatarData(new Date())){
        this.notifier.ShowError('Data inválida!');
        return;
      }

      let jogoDto = {
        valorPago: this.formulario.get('valorPago')?.value,
        data: this.formulario.get('data')?.value,
        racha: this.idRacha,
      };

      jogoDto.data = this.utils.formatarDataToSQL(jogoDto.data);

      let jogoInput = new JogoInput(jogoDto);

      this.jogoService.create(jogoInput).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Jogo cadastrada com sucesso!');
          this.router.navigateByUrl(`/jogos/racha/${this.jogo.idRacha}`);
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
    this.router.navigateByUrl(`/jogos/racha/${this.idRacha}`);
  }
}
