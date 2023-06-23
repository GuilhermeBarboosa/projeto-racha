import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jogo } from 'src/app/interface/dto/jogo';
import { JogoService } from 'src/app/routes/jogo.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-info-jogos',
  templateUrl: './info-jogos.component.html',
  styleUrls: ['./info-jogos.component.css']
})
export class InfoJogosComponent implements OnInit {


  formulario!: FormGroup;
  jogo?: Jogo;
  isDisabled = true;
  idRacha = this.activedRouter.snapshot.params['id'];
  Editar = 'Editar';
  Voltar = 'Voltar';

  constructor(
    private activedRouter: ActivatedRoute,
    private jogosService: JogoService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.jogosService.getById(this.idRacha).subscribe(
      (data) => {
        var jogoResponse = JSON.parse(JSON.stringify(data));
        this.jogo = jogoResponse;

        this.jogo!.data = this.utils.formatarData(
          this.jogo!.data
        );
        this.jogo!.created = this.utils.formatarData(
          this.jogo!.created
        );
        this.jogo!.updated = this.utils.formatarData(
          this.jogo!.updated
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
      id: [{ value: this.jogo?.id, disabled: this.isDisabled }],
      valorPago: [
        { value: "R$" +this.jogo?.valorPago, disabled: this.isDisabled },
        Validators.required,
      ],
      data: [
        { value: this.jogo?.data, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.jogo?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.jogo?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    this.router.navigateByUrl(`jogos/edit/${this.idRacha}`);
  }

  return(){
    this.router.navigateByUrl(`/jogos/racha/${this.jogo?.idRacha}`);
  }

  remove() {
    this.jogosService.delete(this.jogo?.id!).subscribe(
      (data) => {
        this.notifier.ShowError('Jogo removida com sucesso!');
        this.router.navigateByUrl('/jogos');
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

}
