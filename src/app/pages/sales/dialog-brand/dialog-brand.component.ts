import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

  modalRef: BsModalRef;
  message: string;
  isEditMode: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    private modalService: BsModalService
  ) {

    this.brandForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['']
    });
    this.brandsRespone = data;

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
    this.isEditMode = true;
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


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.deleteBrandsData();
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
