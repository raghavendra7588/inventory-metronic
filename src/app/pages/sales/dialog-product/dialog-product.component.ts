import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { ProductMeasurementUnit } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {

  categoryResponse: any = [];
  product: ProductMeasurementUnit = new ProductMeasurementUnit();

  productForm: FormGroup;
  strSellerId: string;

  modalRef: BsModalRef;
  message: string;
  isEditMode: boolean = false;


  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) {

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.categoryResponse = data;
    
  }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    if (this.categoryResponse) {
      this.assignValues();
    }

  }

  onSubmit() {
    if (this.categoryResponse) {
      this.product.userid = this.strSellerId;
      this.product.IsActive = '1';
      this.spinner.show(undefined,
        {
          type: 'square-spin',
          size: 'medium',
          color: 'white'
        }
      );
      this.salesService.updateProductMeasurementUnit(this.product).subscribe(res => {
        
        this.toastr.success('Updated Successfully !!');
        this.emitterService.isAdminCreadtedOrUpdated.emit(true);
        this.dialogRef.close();
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
    }
    else {
      this.product.userid = this.strSellerId;
      this.product.IsActive = '1';
      this.product.id = '0';

      this.salesService.updateProductMeasurementUnit(this.product).subscribe(res => {

        this.toastr.success('Inserted Successfully !!');
        this.emitterService.isAdminCreadtedOrUpdated.emit(true);
        this.dialogRef.close();
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
    }


  }

  assignValues() {
    this.isEditMode = true;
    this.product.IsActive = this.categoryResponse.isactive;
    this.product.descriptions = this.categoryResponse.descriptions;
    this.product.id = this.categoryResponse.id;
    this.product.name = this.categoryResponse.name;
    this.product.userid = this.categoryResponse.userid;

  }


  deleteProductMeasurementUnitData() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );

    this.product.userid = this.strSellerId;
    this.product.IsActive = '0';
  
    this.salesService.deleteProductUnitData(this.product).subscribe(res => {
      this.toastr.error('Deleted Successfully !!');
      this.emitterService.isDeleted.emit(true);
      this.dialogRef.close();
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.deleteProductMeasurementUnitData();
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}


