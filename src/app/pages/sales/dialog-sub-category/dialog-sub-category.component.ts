import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SubCategory } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-sub-category',
  templateUrl: './dialog-sub-category.component.html',
  styleUrls: ['./dialog-sub-category.component.scss']
})
export class DialogSubCategoryComponent implements OnInit {

  subCategoryResponse: any = [];
  subCategory: SubCategory = new SubCategory();
  subCategoryForm: FormGroup;
  strSellerId: string;

  categoriesResponse: any = [];
  selectedCategory: any;

  filename: string = null;
  fileData: File = null;
  fileName: any;

  title: string;
  imageUrl: string;
  isImageSelected: boolean = false;

  modalRef: BsModalRef;
  message: string;

	isEditMode: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogSubCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    private modalService: BsModalService
  ) {

    this.subCategoryForm = this.formBuilder.group({
      parentCategory: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['']
    });
    this.subCategoryResponse = data;

  }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.getAllCategoriesData();

    if (this.subCategoryResponse) {
      this.assignValues();
    }
  }

  onSubmit() {
    let formData = new FormData();
    if (this.subCategoryResponse) {


      let Category = {
        "name": this.subCategory.name.toString(),
        "descriptions": this.subCategory.descriptions.toString(),
        "imageurl": this.imageUrl.toString(),
        "isparent": "0",
        "parentid": this.subCategory.parentCategory.toString(),
        "id": this.subCategory.id.toString(),
        "IsActive": "1",
        "userid": this.strSellerId
      };


      if (this.isImageSelected) {
        formData.append('uploadedFiles', this.fileData, this.fileName);
      }

      formData.append('Category', JSON.stringify(Category));


    }
    else {

      let Category = {
        "name": this.subCategory.name.toString(),
        "descriptions": this.subCategory.descriptions.toString(),
        "imageurl": '',
        "isparent": "0",
        "parentid": this.subCategory.parentCategory.toString(),
        "id": '0',
        "IsActive": "1",
        "userid": this.strSellerId
      };

      if (this.isImageSelected) {
        formData.append('uploadedFiles', this.fileData, this.fileName);
      }

      formData.append('Category', JSON.stringify(Category));

    }



    this.salesService.insertUpdateCategory(formData).subscribe(res => {
      this.toastr.success('Completed Successfully !!');
      this.emitterService.isAdminCreadtedOrUpdated.emit(true);
      this.dialogRef.close();
    });
  }

  selectFile(e) {
    this.isImageSelected = true;
    this.fileData = <File>e.target.files[0];
    this.fileName = e.target.files[0].name;
  }


  assignValues() {
    this.isEditMode = true;
    this.subCategory.name = this.subCategoryResponse.name;
    this.subCategory.descriptions = this.subCategoryResponse.descriptions;
    this.subCategory.isparent = this.subCategoryResponse.isparent;
    this.imageUrl = this.subCategoryResponse.imageurl;

    this.subCategory.parentid = this.subCategoryResponse.parentid;
    this.subCategory.id = this.subCategoryResponse.id;
    this.subCategory.isactive = this.subCategoryResponse.isactive;
    this.subCategory.userid = this.subCategoryResponse.id;
    this.subCategory.parentCategory = this.subCategoryResponse.parentid;
  }

  getAllCategoriesData() {

    this.salesService.getCategoriesData('0').subscribe(res => {
   
      this.categoriesResponse = res;
    });
  }

  selectedCategoryFromList(res) {
 
    this.selectedCategory = res;

  }

  deleteSubCategory() {
    let deleteFormData = new FormData();

    let Category = {
      "name": this.subCategory.name.toString(),
      "descriptions": this.subCategory.descriptions.toString(),
      "imageurl": this.imageUrl,
      "isparent": "False",
      "parentid": this.subCategory.parentCategory.toString(),
      "id": this.subCategory.id.toString(),
      "IsActive": "0",
    };

    deleteFormData.append('Category', JSON.stringify(Category));
    this.salesService.deleteSubCategories(deleteFormData).subscribe(res => {
      this.toastr.error('Deleted Successfully !!');
      this.emitterService.isDeleted.emit(true);
      this.dialogRef.close();

    });

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.deleteSubCategory();
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }


}
