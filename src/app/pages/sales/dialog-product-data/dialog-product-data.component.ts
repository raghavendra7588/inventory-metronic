import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-product-data',
  templateUrl: './dialog-product-data.component.html',
  styleUrls: ['./dialog-product-data.component.scss']
})
export class DialogProductDataComponent implements OnInit {


  displayedColumns = ['measurementUnit', 'varient', 'price', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  constructor(
    public salesService: SalesService
  ) { }

  ngOnInit(): void {
  }

  selectFile(e) {

  }

}
