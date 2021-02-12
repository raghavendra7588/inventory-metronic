import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-sales-enquiry',
  templateUrl: './dialog-sales-enquiry.component.html',
  styleUrls: ['./dialog-sales-enquiry.component.scss']
})
export class DialogSalesEnquiryComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogSalesEnquiryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

}
