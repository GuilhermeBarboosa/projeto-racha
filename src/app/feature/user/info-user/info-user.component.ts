import { FormatterDateService } from './../../../shared/formatter-date.service';
import { Jogador } from './../../../interface/dto/jogador';
import { JogadorService } from './../../../service/jogador.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/dto/user';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  formulario!: FormGroup;
  user?: User;
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  Editar = "Editar";
  constructor(private activedRouter: ActivatedRoute,
              private userService: UserService,
              private jogadorService: JogadorService,
              private router: Router,
              private formatterDateService: FormatterDateService,
              private formBuilder: FormBuilder,
              private notifier: NotifierService) { }


  async ngOnInit() {

    (await this.userService.getById(this.id)).toPromise().then((data) => {
      var userResponse = JSON.parse(JSON.stringify(data));
      this.user = userResponse;

      this.user!.created = this.formatterDateService.formatarData(this.user!.created);
      this.user!.updated = this.formatterDateService.formatarData(this.user!.updated);


      this.createTable();


    }).catch((error) => {
      this.notifier.ShowError(error.error);
    });

  }

  edit(){
    this.router.navigateByUrl(`user/edit/${this.id}`);
  }

  remove(){
    this.userService.delete(this.id).subscribe(
      (data) => {
        this.notifier.ShowError('Usuário removido com sucesso!');
        this.router.navigateByUrl('/user');
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
      );
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.user?.id, disabled: this.isDisabled}],
      nome: [{value: this.user?.nome, disabled: this.isDisabled} , Validators.required],
      email: [{ value: this.user?.email, disabled: this.isDisabled}, Validators.required],
      idade: [{ value: this.user?.idade, disabled: this.isDisabled}, Validators.required],
      role: [{ value: this.user?.role?.role, disabled: this.isDisabled}, Validators.required],
      telefone: [{ value: this.user?.telefone, disabled: this.isDisabled}, Validators.required],
      created: [{ value: this.user?.created, disabled: this.isDisabled}, Validators.required],
      updated: [{ value: this.user?.updated, disabled: this.isDisabled}, Validators.required]
    })
  }

}
