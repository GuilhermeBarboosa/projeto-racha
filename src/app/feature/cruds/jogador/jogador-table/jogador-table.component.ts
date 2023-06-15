import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Jogador } from 'src/app/interface/dto/jogador';
import { JogadorInput } from 'src/app/interface/input/jogadorInput';
import { JogadorService } from 'src/app/routes/jogador.service';
import { NotifierService } from 'src/app/shared/notifier.service';

@Component({
  selector: 'app-jogador-table',
  templateUrl: './jogador-table.component.html',
  styleUrls: ['./jogador-table.component.css']
})
export class JogadorTableComponent implements OnInit, AfterViewInit {


  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = [
    'id',
    'user',
    'posicao',
    'status',
    'info',
    'excluir',
  ];
  Adicionar = "Adicionar";
  Info = "Info";

  jogadorArray = new MatTableDataSource<Jogador>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private jogadorService: JogadorService,
    public dialog: MatDialog,
    private router: Router,
    private notifier: NotifierService,
  ) {}

  ngOnInit() {
    this.initTable();
  }

  ngAfterViewInit() {
    this.jogadorArray.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.jogadorArray.filter = filterValue;
  }

  info(jogador: Jogador) {
    this.router.navigateByUrl(`jogador/info/${jogador.id}`);
  }

  ativar(jogador: Jogador) {

    let jogadorInput = new JogadorInput(jogador);

    this.jogadorService.ativar(jogadorInput, jogador.id!).subscribe(
      (data) => {
        this.notifier.ShowSuccess('Jogador ativado com sucesso!');
        window.location.reload();
      }
    );

    window.location.reload();
  }

  openDialog(jogador: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { value: this.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.jogadorService.delete(jogador.id).subscribe(
          (data) => {
            this.notifier.ShowSuccess('Jogador excluído com sucesso!');
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
    this.jogadorService.getAll().subscribe((data) => {
      var jogadorResponse = JSON.parse(JSON.stringify(data));


      console.log(jogadorResponse);
      jogadorResponse.map((jogador: Jogador) => {
        if (jogador.actived) {
          jogador.actived = 'Ativo';
        } else {
          jogador.actived = 'Desativado';
        }
        }

      );
      this.jogadorArray.data = jogadorResponse;
      this.jogadorArray.filter = "Ativo";
    });
  }


  getByInativo(){
    this.jogadorArray.filter = "Desativado";
  }

  getByAtivo(){
    this.jogadorArray.filter = "Ativo";
  }


}
