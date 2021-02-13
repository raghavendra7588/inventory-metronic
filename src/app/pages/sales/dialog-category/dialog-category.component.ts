import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { Category } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit {

  categoryResponse: any = [];

  category: Category = new Category();

  categoryForm: FormGroup;

  filename: string = null;
  fileData: File = null;
  fileName: any;

  title: string;

  imageUrl: string;
  isImageSelected: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService
  ) {

    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['']
    });

    this.categoryResponse = data;
    console.log('category response', data);

  }

  ngOnInit(): void {
    if (this.categoryResponse) {
      this.assignValues();
    }
  }

  onSubmit() {

    const formData = new FormData();
    if (this.categoryResponse) {


      let Category = {
        "name": this.category.name.toString(), "descriptions": this.category.descriptions.toString(),
        "imageurl": this.imageUrl.toString(), "isparent": "1",
        "parentid": "0",
        "id": "0",
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
        "name": this.category.name.toString(), "descriptions": this.category.descriptions.toString(),
        "imageurl": "", "isparent": "1",
        "parentid": "0",
        "id": "0",
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
    this.category.name = this.categoryResponse.name;
    this.category.descriptions = this.categoryResponse.descriptions;
    this.category.isparent = this.categoryResponse.isparent;
    this.imageUrl = this.categoryResponse.imageurl;
    // this.category.imageurl = this.categoryResponse.imageurl;
    this.category.parentid = this.categoryResponse.parentid;
    this.category.id = this.categoryResponse.id;
    this.category.isactive = this.categoryResponse.isactive;
    this.category.userid = this.categoryResponse.id;
  }
}
