import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';

import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-brand',
  templateUrl: './dialog-brand.component.html',
  styleUrls: ['./dialog-brand.component.scss']
})
export class DialogBrandComponent implements OnInit {
  categoryResponse: any = [];


  brandForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private salesService: SalesService
  ) {

    this.brandForm = this.formBuilder.group({
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
    // this.fileData = <File>e.target.files[0];
    // this.isFileUploaded = true;
    // this.fileName = e.target.files[0].name;
  }

}
