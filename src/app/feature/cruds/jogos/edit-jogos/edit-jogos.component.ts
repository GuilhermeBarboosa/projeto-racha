import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jogo } from 'src/app/interface/dto/jogo';
import { JogoInput } from 'src/app/interface/input/jogoInput';
import { JogoService } from 'src/app/routes/jogo.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-edit-jogos',
  templateUrl: './edit-jogos.component.html',
  styleUrls: ['./edit-jogos.component.css']
})
export class EditJogosComponent implements OnInit {
  formulario!: FormGroup;
  jogo?: Jogo;
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private activedRouter: ActivatedRoute,
    private jogoService: JogoService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.jogoService.getById(this.id).subscribe((res) => {
      var jogoResponse = JSON.parse(JSON.stringify(res));

      jogoResponse.data = this.utils.formatarData(
        jogoResponse.data
      );
      jogoResponse.created = this.utils.formatarData(
        jogoResponse.created
      );
      jogoResponse.updated = this.utils.formatarData(
        jogoResponse.updated
      );
      this.jogo = jogoResponse;
      console.log(this.jogo)
      this.createTable();
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.jogo?.id, disabled: true }],
      valorPago: [
        { value: this.jogo?.valorPago, disabled: this.isDisabled },
        Validators.required,
      ],
      data: [
        { value: this.jogo?.data, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.jogo?.created, disabled: true },
        Validators.required,
      ],
      updated: [
        { value: this.jogo?.updated, disabled: true },
        Validators.required,
      ],
    });
  }

  edit() {
    if (this.formulario.valid) {
      let jogoDTO = {
        valorPago: this.formulario.get('valorPago')?.value,
        data: this.formulario.get('data')?.value,
        racha: this.jogo?.idRacha,
      };

      jogoDTO.data = this.utils.formatarDataToSQL(jogoDTO.data);


      let jogoInput = new JogoInput(jogoDTO);
      console.log(jogoInput)

      this.jogoService.edit(jogoInput, this.jogo!.id!).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Jogo atualizada com sucesso!');
          this.router.navigateByUrl(`/jogos/racha/${this.jogo?.idRacha}`);
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
    this.router.navigateByUrl(`/jogos/info/${this.id}`);
  }
}
