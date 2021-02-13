import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  categoriesResponse: any = [];
  selectedCategory: any;

  filename: string = null;
  fileData: File = null;
  fileName: any;

  title: string;
  imageUrl: string;
  isImageSelected: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogSubCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService
  ) {

    this.subCategoryForm = this.formBuilder.group({
      parentCategory: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['']
    });
    this.subCategoryResponse = data;
    console.log('subCategoryResponse', data);
  }

  ngOnInit(): void {
    this.getAllCategoriesData();

    if (this.subCategoryResponse) {
      this.assignValues();
    }
  }

  onSubmit() {
    const formData = new FormData();
    if (this.subCategoryResponse) {


      let Category = {
        "name": this.subCategory.name.toString(),
        "descriptions": this.subCategory.descriptions.toString(),
        "imageurl": this.imageUrl.toString(),
        "isparent": "0",
        "parentid": this.subCategory.parentCategory.toString(),
        "id": this.subCategory.id.toString(),
        "IsActive": "1",
        "userid": "1"
      };


      if (this.isImageSelected) {
        formData.append('uploadedFiles', this.fileData, this.fileName);
      }

      formData.append('Category', JSON.stringify(Category));


      console.log('this.fileData', this.fileData);
      console.log('this.fileName', this.fileName);
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
        "userid": "1"
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
      console.log('cat res', res);
      this.categoriesResponse = res;
    });
  }

  selectedCategoryFromList(res) {
    console.log('selected cat', res);
    this.selectedCategory = res;
    console.log('current category', this.subCategory.parentCategory);
  }

}
