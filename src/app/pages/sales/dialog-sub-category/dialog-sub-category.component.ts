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

  categoryResponse: any = [];
  subCategory: SubCategory = new SubCategory();

  subCategoryForm: FormGroup;


  filename: string = null;
  fileData: File = null;
  fileName: any;

  title: string;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogSubCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private salesService: SalesService
  ) {

    this.subCategoryForm = this.formBuilder.group({
      parentCategory: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  selectFile(e) {
    console.log(e);
    this.fileData = <File>e.target.files[0];
    this.fileName = e.target.files[0].name;
  }

}
