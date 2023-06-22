import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Quadra } from 'src/app/interface/dto/quadra';
import { Racha } from 'src/app/interface/dto/racha';
import { JogadorRachaService } from 'src/app/routes/jogador-racha.service';
import { QuadraService } from 'src/app/routes/quadra.service';
import { RachaService } from 'src/app/routes/racha.service';

@Component({
  selector: 'app-table-info-jogos',
  templateUrl: './table-info-jogos.component.html',
  styleUrls: ['./table-info-jogos.component.css'],
})
export class TableInfoJogosComponent implements OnInit, AfterViewInit {
  constructor(private rachaService: RachaService, private router: Router) {}

  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = ['id', "racha", "quadra" , 'info'];
  Adicionar = 'Adicionar';
  Info = 'Info';

  arrayRacha = new MatTableDataSource<Racha>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.rachaService.getAll().subscribe((data) => {
      this.arrayRacha = JSON.parse(JSON.stringify(data));

      console.log(this.arrayRacha)
    });
  }

  ngAfterViewInit() {
    this.arrayRacha.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.arrayRacha.filter = filterValue;
  }

  info(racha: Racha) {
    this.router.navigateByUrl(`jogos/racha/${racha.id}`);
  }

  getByInativo() {
    this.arrayRacha.filter = 'Desativado';
  }

  getByAtivo() {
    this.arrayRacha.filter = 'Ativo';
  }
}
