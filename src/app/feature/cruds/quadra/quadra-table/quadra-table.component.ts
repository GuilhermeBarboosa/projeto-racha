import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Quadra } from 'src/app/interface/dto/quadra';
import { QuadraInput } from 'src/app/interface/input/quadraInput';
import { QuadraService } from 'src/app/routes/quadra.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-quadra-table',
  templateUrl: './quadra-table.component.html',
  styleUrls: ['./quadra-table.component.css']
})
export class QuadraTableComponent implements OnInit, AfterViewInit {

  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = ['id', 'quadra', 'status', 'info', 'excluir'];
  Adicionar = 'Adicionar';
  Info = 'Info';

  quadraArray = new MatTableDataSource<Quadra>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private quadraService: QuadraService,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.initTable();
  }

  ngAfterViewInit() {
    this.quadraArray.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.quadraArray.filter = filterValue;
  }

  info(quadra: Quadra) {
    this.router.navigateByUrl(`quadra/info/${quadra.id}`);
  }

  ativar(quadra: Quadra) {
    let posicaoInput = new QuadraInput(quadra);

    this.quadraService.ativar(posicaoInput, quadra.id!).subscribe((data) => {
      this.notifier.ShowSuccess('Quadra ativada com sucesso!');
      window.location.reload();
    });

    window.location.reload();
  }

  openDialog(quadra: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.quadraService.delete(quadra.id).subscribe(
          (data) => {
            this.notifier.ShowSuccess('Quadra excluída com sucesso!');
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
    this.quadraService.getAll().subscribe((data) => {
      var quadraResponse = JSON.parse(JSON.stringify(data));

      quadraResponse.map((quadra: Quadra) => {
        if (quadra.actived) {
          quadra.actived = 'Ativo';
        } else {
          quadra.actived = 'Desativado';
        }
      });
      this.quadraArray.data = quadraResponse;
      this.quadraArray.filter = 'Ativo';
    });
  }

  getByInativo() {
    this.quadraArray.filter = 'Desativado';
  }

  getByAtivo() {
    this.quadraArray.filter = 'Ativo';
  }

}
