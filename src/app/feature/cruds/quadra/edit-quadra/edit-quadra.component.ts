import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quadra } from 'src/app/interface/dto/quadra';
import { QuadraInput } from 'src/app/interface/input/quadraInput';
import { QuadraService } from 'src/app/routes/quadra.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-edit-quadra',
  templateUrl: './edit-quadra.component.html',
  styleUrls: ['./edit-quadra.component.css']
})
export class EditQuadraComponent implements OnInit {

  formulario!: FormGroup;
  quadra?: Quadra;
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private activedRouter: ActivatedRoute,
    private quadraService: QuadraService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.quadraService.getById(this.id).subscribe((res) => {
      var posicaoResponse = JSON.parse(JSON.stringify(res));

      posicaoResponse.created = this.utils.formatarData(
        posicaoResponse.created
      );
      posicaoResponse.updated = this.utils.formatarData(
        posicaoResponse.updated
      );

      this.quadra = posicaoResponse;
      this.createTable();
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.quadra?.id, disabled: true }],
      quadra: [
        { value: this.quadra?.nome, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.quadra?.created, disabled: true },
        Validators.required,
      ],
      updated: [
        { value: this.quadra?.updated, disabled: true },
        Validators.required,
      ],
    });
  }

  edit() {
    if (this.formulario.valid) {
      let quadraDTO = {
        nome: this.formulario.get('quadra')?.value,
      };

      let quadraInput = new QuadraInput(quadraDTO);

      this.quadraService.edit(quadraInput, this.quadra!.id!).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Quadra atualizada com sucesso!');
          this.router.navigateByUrl(`/quadra`);
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
    this.router.navigateByUrl(`/quadra/info/${this.quadra?.id}`);
  }
}
