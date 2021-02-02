import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogOrderPrintComponent } from '../dialog-order-print/dialog-order-print.component';
import { PurchaseOrder } from '../purchase.model';

@Component({
  selector: 'app-dialog-purchase-order-print',
  templateUrl: './dialog-purchase-order-print.component.html',
  styleUrls: ['./dialog-purchase-order-print.component.scss']
})
export class DialogPurchaseOrderPrintComponent implements OnInit {

  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  purchaseOrderData: any;
  orderNo: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogPurchaseOrderPrintComponent>,
    public emitterService: EmitterService,
    public router: Router,
    public dialog: MatDialog) {
    this.purchaseOrderData = data;
    this.orderNo = data.OrderNo;
  }

  ngOnInit(): void {
  }

  notPrint() {
    this.dialogRef.close(true);
    this.router.navigate(['/dashboard']);
  }

  agreeToPrint() {
    this.dialogRef.close(true);
    this.dialog.open(DialogOrderPrintComponent, {
      disableClose: true,
      height: '650px',
      width: '800px',
      data: this.purchaseOrderData
    });

  }
}
