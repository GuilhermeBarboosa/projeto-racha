import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quadra } from 'src/app/interface/dto/quadra';
import { QuadraService } from 'src/app/routes/quadra.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-info-quadra',
  templateUrl: './info-quadra.component.html',
  styleUrls: ['./info-quadra.component.css']
})
export class InfoQuadraComponent implements OnInit {

  formulario!: FormGroup;
  quadra?: Quadra;
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  Editar = 'Editar';
  Voltar = 'Voltar';

  constructor(
    private activedRouter: ActivatedRoute,
    private quadraService: QuadraService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.quadraService.getById(this.id).subscribe(
      (data) => {
        var userResponse = JSON.parse(JSON.stringify(data));
        this.quadra = userResponse;

        this.quadra!.created = this.utils.formatarData(
          this.quadra!.created
        );
        this.quadra!.updated = this.utils.formatarData(
          this.quadra!.updated
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
      id: [{ value: this.quadra?.id, disabled: this.isDisabled }],
      quadra: [
        { value: this.quadra?.nome, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.quadra?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.quadra?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  edit() {
    this.router.navigateByUrl(`quadra/edit/${this.id}`);
  }

  return(){
    this.router.navigateByUrl('/quadra');
  }

  remove() {
    this.quadraService.delete(this.id).subscribe(
      (data) => {
        this.notifier.ShowError('Quadra removida com sucesso!');
        this.router.navigateByUrl('/quadra');
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }


}
