import { Router } from '@angular/router';
import { UserService } from './../../../service/user.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { User } from 'src/app/interface/user';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit  {
  users: User[] = [];
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'idade',
    'role',
    'status',
    'editar',
    'ativar',
  ];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.userService.getAll().subscribe((data) => {
      var usersResponse = JSON.parse(JSON.stringify(data));
      this.users = usersResponse;
    });
  }

  update(user: any) {
    this.router.navigateByUrl(`user/edit/${user.id}`);
  }

  ativar(user: any) {
    this.userService.getById(user.id).subscribe(
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

}
