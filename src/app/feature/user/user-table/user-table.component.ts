import { Router } from '@angular/router';
import { UserService } from './../../../service/user.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { User } from 'src/app/interface/dto/user';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/shared/notifier.service';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { UserInput } from 'src/app/interface/input/userInput';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit  {
  users: User[] = [];
  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'role',
    'status',
    'info',
    'excluir',
  ];
  Adicionar = "Adicionar";
  Info = "Info";

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService,
  ) {}

  ngOnInit() {
    this.initTable("true");
  }

  info(user: User) {
    this.router.navigateByUrl(`user/info/${user.id}`);
  }

  async ativar(user: any) {
    (await this.userService.getById(user.id)).subscribe(
      (data) => {
        var userResponse = JSON.parse(JSON.stringify(data));
        user = userResponse;
      }
    );

    this.userService.ativar(user, user.id).subscribe(
      (data) => {
        this.notifier.ShowSuccess('Usuário ativado com sucesso!');
      }
    );

    window.location.reload();
  }

  openDialog(user: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.userService.delete(user.id).subscribe(
          (data) => {
            this.notifier.ShowSuccess('Usuário excluído com sucesso!');
            window.location.reload();
          },
          (error) => {
            this.notifier.ShowError('Erro ao excluir usuário!');
          }
        );
      }
    });
  }

  initTable( ativo: string ){
    this.userService.getAll().subscribe((data) => {
      var usersResponse = JSON.parse(JSON.stringify(data));
      let arrayUsers = [] as User[];
      usersResponse.map((user: User) => {
       if(String(user.actived) == ativo){
         arrayUsers.push(user);
        }
      });

      arrayUsers.map((user) => {
        if (user.actived) {
          user.actived = 'Ativo';
        } else {
          user.actived = 'Inativo';
        }
        }
      );

      this.users = arrayUsers;
    });
  }


  getByInativo(){
    this.initTable('false');
  }

  getByAtivo(){
    this.initTable('true');
  }

  ativarUser(user: User) {
    let userInput = new UserInput(user);

    this.userService.ativar(userInput, user.id!).subscribe(
      (data) => {
        this.notifier.ShowSuccess('Usuário ativado com sucesso!');
        window.location.reload();
      }
    );
  }

}
