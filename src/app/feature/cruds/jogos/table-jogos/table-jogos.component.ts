import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-jogos',
  templateUrl: './table-jogos.component.html',
  styleUrls: ['./table-jogos.component.css']
})
export class TableJogosComponent implements OnInit {

  constructor(   public dialog: MatDialog,
    private router: Router,) { }

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

  // jogoArray = new MatTableDataSource<Jogos>;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
  }

}
