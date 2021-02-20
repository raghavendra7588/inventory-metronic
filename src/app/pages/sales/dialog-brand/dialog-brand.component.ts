import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { Brand } from '../sales.model.';

import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-brand',
  templateUrl: './dialog-brand.component.html',
  styleUrls: ['./dialog-brand.component.scss']
})
export class DialogBrandComponent implements OnInit {
  brandsRespone: any = [];
  brand: Brand = new Brand();
  strSellerId: string;

  brandForm: FormGroup;
  filename: string = null;
  fileData: File = null;
  fileName: any;

  imageUrl: string;
  isImageSelected: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService
  ) {

    this.brandForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['']
    });
    this.brandsRespone = data;
    console.log('this.brandsRespone', this.brandsRespone);
  }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');

    if (this.brandsRespone) {
      this.assignValues();
    }
  }

  onSubmit() {
    let formData = new FormData();

    if (this.brandsRespone) {


      let Brand = {
        "name": this.brand.name.toString(),
        "descriptions": this.brand.descriptions.toString(),
        "imageurl": this.imageUrl.toString(),
        "id": this.brandsRespone.id.toString(),
        "IsActive": "1",
        "userid": this.strSellerId
      };


      if (this.isImageSelected) {
        formData.append('uploadedFiles', this.fileData, this.fileName);
      }

      formData.append('brand', JSON.stringify(Brand));


      console.log('this.fileData', this.fileData);
      console.log('this.fileName', this.fileName);
    }
    else {

      let Brand = {
        "name": this.brand.name.toString(),
        "descriptions": this.brand.descriptions.toString(),
        "imageurl": '',
        "id": '0',
        "IsActive": "1",
        "userid": this.strSellerId
      };

      if (this.isImageSelected) {
        formData.append('uploadedFiles', this.fileData, this.fileName);
      }

      formData.append('brand', JSON.stringify(Brand));

    }


    this.salesService.insertUpdateBrand(formData).subscribe(res => {
      this.toastr.success('Completed Successfully !!');
      this.emitterService.isAdminCreadtedOrUpdated.emit(true);
      this.dialogRef.close();
    });

  }

  selectFile(e) {
    this.fileData = <File>e.target.files[0];
    this.isImageSelected = true;
    this.fileName = e.target.files[0].name;
  }


  assignValues() {
    this.brand.name = this.brandsRespone.name;
    this.brand.descriptions = this.brandsRespone.descriptions;
    this.imageUrl = this.brandsRespone.imageurl;
    this.brand.id = this.brandsRespone.id;
    this.brand.IsActive = this.brandsRespone.isactive;
    this.brand.userid = this.brandsRespone.id;
  }

  deleteBrandsData() {

    let deleteFormData = new FormData();

    let Brand = {
      "name": this.brand.name.toString(),
      "descriptions": this.brand.descriptions.toString(),
      "imageurl": this.imageUrl.toString(),
      "id": this.brandsRespone.id.toString(),
      "IsActive": "0",
    };

    deleteFormData.append('brand', JSON.stringify(Brand));

    this.salesService.deleteBrand(deleteFormData).subscribe(res => {
      this.toastr.error('Deleted Successfully !!');
      this.emitterService.isAdminCreadtedOrUpdated.emit(true);
      this.dialogRef.close();
    });
  }
}
