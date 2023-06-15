import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Posicao } from 'src/app/interface/dto/posicao';
import { PosicaoInput } from 'src/app/interface/input/posicaoInput';
import { PosicaoService } from 'src/app/routes/posicao.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-posicao-table',
  templateUrl: './posicao-table.component.html',
  styleUrls: ['./posicao-table.component.css'],
})
export class PosicaoTableComponent implements OnInit, AfterViewInit {
  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = ['id', 'posicao', 'status', 'info', 'excluir'];
  Adicionar = 'Adicionar';
  Info = 'Info';

  posicaoArray = new MatTableDataSource<Posicao>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private posicaoService: PosicaoService,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.initTable();
  }

  ngAfterViewInit() {
    this.posicaoArray.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.posicaoArray.filter = filterValue;
  }

  info(posicao: Posicao) {
    this.router.navigateByUrl(`posicao/info/${posicao.id}`);
  }

  ativar(posicao: Posicao) {
    let posicaoInput = new PosicaoInput(posicao);

    this.posicaoService.ativar(posicaoInput, posicao.id!).subscribe((data) => {
      this.notifier.ShowSuccess('Posição ativada com sucesso!');
      window.location.reload();
    });

    window.location.reload();
  }

  openDialog(posicao: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.posicaoService.delete(posicao.id).subscribe(
          (data) => {
            this.notifier.ShowSuccess('Posição excluída com sucesso!');
            window.location.reload();
          },
          (error) => {
            this.notifier.ShowError('Erro ao excluir posição!');
          }
        );
      }
    });
  }

  initTable() {
    this.posicaoService.getAll().subscribe((data) => {
      var usersResponse = JSON.parse(JSON.stringify(data));

      usersResponse.map((posicao: Posicao) => {
        if (posicao.actived) {
          posicao.actived = 'Ativo';
        } else {
          posicao.actived = 'Desativado';
        }
      });
      this.posicaoArray.data = usersResponse;
      this.posicaoArray.filter = 'Ativo';
    });
  }

  getByInativo() {
    this.posicaoArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.posicaoArray.filter = 'Ativo';
  }
}
