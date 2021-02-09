import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { InsertUpdateCategory } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit {

  categoryResponse: any = [];

  insertUpdateCategory: InsertUpdateCategory = new InsertUpdateCategory();

  categoryForm: FormGroup;

  filename: string = null;
  fileData: File = null;
  fileName: any;

  title: string;

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
      formData.append('name', this.insertUpdateCategory.name.toString());
      formData.append('descriptions', this.insertUpdateCategory.descriptions.toString());

      //
      formData.append('imageurl', this.categoryResponse.imageurl);
      //
      formData.append('isparent', this.insertUpdateCategory.isparent.toString());
      formData.append('parentid', this.insertUpdateCategory.parentid.toString());

      formData.append('id', this.insertUpdateCategory.id.toString());
      formData.append('IsActive', this.insertUpdateCategory.isactive.toString());
      formData.append('userid', this.insertUpdateCategory.id.toString());
    }


    // this.insertUpdateCategory.name = this.categoryResponse.name;
    // this.insertUpdateCategory.descriptions = this.categoryResponse.descriptions;
    // this.insertUpdateCategory.isparent = this.categoryResponse.isparent;
    // this.insertUpdateCategory.imageurl = this.categoryResponse.imageurl;
    // this.insertUpdateCategory.parentid = this.categoryResponse.parentid;
    // this.insertUpdateCategory.id = this.categoryResponse.id;
    // this.insertUpdateCategory.IsActive = this.categoryResponse.isactive;
    // this.insertUpdateCategory.userid = this.categoryResponse.id;



    this.salesService.insertUpdateCategory(formData).subscribe(res => {
      this.toastr.success('Successfully !!');
      this.emitterService.isAdminCreadtedOrUpdated.emit(true);
    });
  }

  selectFile(e) {
    console.log(e);
    this.fileData = <File>e.target.files[0];
    this.fileName = e.target.files[0].name;
  }

  assignValues() {
    this.insertUpdateCategory.name = this.categoryResponse.name;
    this.insertUpdateCategory.descriptions = this.categoryResponse.descriptions;
    this.insertUpdateCategory.isparent = this.categoryResponse.isparent;
    // this.insertUpdateCategory.imageurl = this.categoryResponse.imageurl;
    this.insertUpdateCategory.parentid = this.categoryResponse.parentid;
    this.insertUpdateCategory.id = this.categoryResponse.id;
    this.insertUpdateCategory.isactive = this.categoryResponse.isactive;
    this.insertUpdateCategory.userid = this.categoryResponse.id;
  }
}
