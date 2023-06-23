import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Quadra } from 'src/app/interface/dto/quadra';
import { QuadraInput } from 'src/app/interface/input/quadraInput';
import { QuadraService } from 'src/app/routes/quadra.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-create-quadra',
  templateUrl: './create-quadra.component.html',
  styleUrls: ['./create-quadra.component.css']
})
export class CreateQuadraComponent implements OnInit {
  quadra!: Quadra;
  formulario!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private router: Router,
    private quadraService: QuadraService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.createTable();
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      valorQuadra: ['', [Validators.required]],
    });
  }

  save() {
    if (this.formulario.valid) {
      let quadraDto = {
        nome: this.formulario.get('nome')?.value,
        valorQuadra: this.formulario.get('valorQuadra')?.value,
      };

      let quadraInput = new QuadraInput(quadraDto);

      this.quadraService.create(quadraInput).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Quadra cadastrada com sucesso!');
          this.router.navigateByUrl('/quadra');
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
    this.router.navigateByUrl('/quadra');
  }
}
