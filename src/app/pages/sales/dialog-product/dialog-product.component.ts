import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    private spinner: NgxSpinnerService
  ) {

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.categoryResponse = data;
    console.log('PMU', this.categoryResponse);
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
        console.log('res', res);
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
    console.log('product', this.product);
    this.salesService.deleteProductUnitData(this.product).subscribe(res => {
      this.toastr.error('Deleted Successfully !!');
      this.emitterService.isDeleted.emit(true);
      this.dialogRef.close();
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }
}


