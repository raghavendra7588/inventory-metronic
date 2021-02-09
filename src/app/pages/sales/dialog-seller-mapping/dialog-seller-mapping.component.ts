import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-seller-mapping',
  templateUrl: './dialog-seller-mapping.component.html',
  styleUrls: ['./dialog-seller-mapping.component.scss']
})
export class DialogSellerMappingComponent implements OnInit {

  userData: any = [];
  userID: any;
  parentChildMappingData: any = [];

  search = new FormControl();
  shoesControl = new FormControl();
  products$: Observable<any>;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogSellerMappingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private salesService: SalesService
  ) {
    this.userData = data;
    console.log('edit', this.userData);
    this.userID = this.userData.id;
    this.getParentChildMappingData(this.userData.id);
    // this.getProductsUsingAsyncPipe(this.userData.id);
  }

  $search = this.search.valueChanges.pipe(
    startWith(null),
    debounceTime(200),
    switchMap((res: string) => {
      console.log(res);
      if (!res) return of(this.parentChildMappingData);
      res = res.toLowerCase();
      return of(
        this.parentChildMappingData.filter(x => x.Name.toLowerCase().indexOf(res) >= 0)
      );
    })
  );


  selectionChange(option: any) {
    let value = this.shoesControl.value || [];
    if (option.selected) value.push(option.value);
    else value = value.filter((x: any) => x != option.value);
    this.shoesControl.setValue(value);
  }

  ngOnInit(): void {
  }

  getParentChildMappingData(id) {
    this.salesService.getParentChildMappingBrand(id).subscribe(res => {
      console.log('child mapping', res);
      this.parentChildMappingData = res;
      
    });
  }

  getProductsUsingAsyncPipe(id) {
    this.products$ = this.salesService.getParentChildMappingBrand(id);
    // this.search = this.products$;
  }
}
