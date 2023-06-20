import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RachaInput } from 'src/app/interface/input/rachaInput';
import { RachaService } from 'src/app/routes/racha.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-create-racha',
  templateUrl: './create-racha.component.html',
  styleUrls: ['./create-racha.component.css']
})
export class CreateRachaComponent implements OnInit {

  id = this.activedRouter.snapshot.params['id'];
  formulario!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private rachaService: RachaService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.createTable();
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  save() {
    if (this.formulario.valid) {
      let rachaDto = {
        nome: this.formulario.get('nome')?.value,
        quadra: this.id
      };

      let rachaInput = new RachaInput(rachaDto);
      
      this.rachaService.create(rachaInput).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Racha cadastrada com sucesso!');
          this.router.navigateByUrl(`quadra/racha/${this.id}`);
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
    this.router.navigateByUrl(`quadra/racha/${this.id}`);
  }
}
