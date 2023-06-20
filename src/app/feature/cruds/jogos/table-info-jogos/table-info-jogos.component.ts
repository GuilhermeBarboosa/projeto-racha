import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Quadra } from 'src/app/interface/dto/quadra';
import { QuadraService } from 'src/app/routes/quadra.service';

@Component({
  selector: 'app-table-info-jogos',
  templateUrl: './table-info-jogos.component.html',
  styleUrls: ['./table-info-jogos.component.css'],
})
export class TableInfoJogosComponent implements OnInit, AfterViewInit {
  constructor(private quadraService: QuadraService, private router: Router) {}

  value?: String;
  mandaFiltroTrue = 'Ativar';
  mandaFiltroFalse = 'Excluir';
  displayedColumns: string[] = ['id', 'nome', 'info'];
  Adicionar = 'Adicionar';
  Info = 'Info';

  arrayQuadras = new MatTableDataSource<Quadra>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.quadraService.getAll().subscribe((data) => {
      this.arrayQuadras = JSON.parse(JSON.stringify(data));
    });
  }

  ngAfterViewInit() {
    this.arrayQuadras.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.arrayQuadras.filter = filterValue;
  }

  info(quadra: Quadra) {
    this.router.navigateByUrl(`jogos/info/${quadra.id}`);
  }

  getByInativo() {
    this.arrayQuadras.filter = 'Desativado';
  }

  getByAtivo() {
    this.arrayQuadras.filter = 'Ativo';
  }
}
