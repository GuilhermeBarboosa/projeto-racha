import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Jogo } from 'src/app/interface/dto/jogo';
import { JogoService } from 'src/app/routes/jogo.service';
import { UtilsService } from '../../../../shared/utils.service';
import { Racha } from 'src/app/interface/dto/racha';
import { RachaService } from 'src/app/routes/racha.service';

@Component({
  selector: 'app-table-jogos',
  templateUrl: './table-jogos.component.html',
  styleUrls: ['./table-jogos.component.css'],
})
export class TableJogosComponent implements OnInit {
  constructor(
    private jogoService: JogoService,
    private rachaService: RachaService,
    private utilsService: UtilsService,
    private router: Router,
    private activedRouter: ActivatedRoute
  ) {}

  value?: String;
  valorTotal = 0;
  idRacha = this.activedRouter.snapshot.params['id'];
  racha! :Racha;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = ['id', 'data', 'valor_pago', 'info'];
  Adicionar = 'Adicionar';
  Info = 'Info';

  arrayJogos = new MatTableDataSource<Jogo>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.rachaService.getById(this.idRacha).subscribe((data) => {
      this.racha = JSON.parse(JSON.stringify(data));;
    });


    this.jogoService.getByIdRacha(this.idRacha).subscribe((data) => {
      let arrayResponse = JSON.parse(JSON.stringify(data));

      arrayResponse.forEach((element: any) => {
        element.data = this.utilsService.formatarData(element.data);

        this.valorTotal += element.valorPago;
      });



      this.arrayJogos.data = arrayResponse;
    });
  }

  ngAfterViewInit() {
    this.arrayJogos.paginator = this.paginator;
  }

  info(jogo: Jogo) {
    this.router.navigateByUrl(`jogos/info/${jogo.id}`);
  }

  add() {
    this.router.navigateByUrl(`jogos/register/${this.idRacha}`);
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.arrayJogos.filter = filterValue;
  }

  getByInativo() {
    this.arrayJogos.filter = 'Desativado';
  }

  getByAtivo() {
    this.arrayJogos.filter = 'Ativo';
  }
}
