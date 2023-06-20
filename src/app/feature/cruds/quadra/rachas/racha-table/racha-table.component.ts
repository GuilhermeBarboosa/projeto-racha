import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Racha } from 'src/app/interface/dto/racha';
import { RachaInput } from 'src/app/interface/input/rachaInput';
import { RachaService } from 'src/app/routes/racha.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-racha-table',
  templateUrl: './racha-table.component.html',
  styleUrls: ['./racha-table.component.css']
})
export class RachaTableComponent implements OnInit, AfterViewInit {


  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = [
    'id',
    'nome',
    'caixa',
    'status',
    'info',
    'excluir',
  ];
  Adicionar = "Adicionar";
  Info = "Info";

  id = this.activedRouter.snapshot.params['id'];
  rachaArray = new MatTableDataSource<Racha>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private rachaService: RachaService,
    private activedRouter: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService,
  ) {}

  ngOnInit() {
    this.initTable();
  }

  ngAfterViewInit() {
    this.rachaArray.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.rachaArray.filter = filterValue;
  }

  info(racha: Racha) {
    this.router.navigateByUrl(`quadra/racha/info/${racha.id}/${this.id}`);
  }

  ativar(racha: Racha) {

    let rachaInput = new RachaInput(racha);

    this.rachaService.ativar(rachaInput, racha.id!).subscribe(
      (data) => {
        this.notifier.ShowSuccess('Racha ativado com sucesso!');
        window.location.reload();
      }
    );

    window.location.reload();
  }

  openDialog(racha: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.rachaService.delete(racha.id).subscribe(
          (data) => {
            this.notifier.ShowSuccess('Racha excluído com sucesso!');
            window.location.reload();
          },
          (error) => {
            this.notifier.ShowError('Erro ao excluir usuário!');
          }
        );
      }
    });
  }

  initTable(){
    this.rachaService.getByIdQuadra(this.id).subscribe((data) => {
      var rachaResponse = JSON.parse(JSON.stringify(data));

      rachaResponse.map((racha: Racha) => {
        if (racha.actived) {
          racha.actived = 'Ativo';
        } else {
          racha.actived = 'Desativado';
        }
        }

      );
      this.rachaArray.data = rachaResponse;
      this.rachaArray.filter = "Ativo";
    });
  }


  getByInativo(){
    this.rachaArray.filter = "Desativado";
  }

  getByAtivo(){
    this.rachaArray.filter = "Ativo";
  }


}
