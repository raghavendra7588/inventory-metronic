import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { EmitterService } from 'src/app/shared/emitter.service';
import { ParentChildMapping } from '../sales.model.';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-dialog-seller-mapping',
  templateUrl: './dialog-seller-mapping.component.html',
  styleUrls: ['./dialog-seller-mapping.component.scss']
})
export class DialogSellerMappingComponent implements OnInit {
  mappingForm: FormGroup;

  userData: any = [];
  userID: any;
  parentChildMappingData: any = [];
  strSellerID: string;

  search = new FormControl();
  shoesControl = new FormControl();
  products$: Observable<any>;
  selectionList: any;

  parentChildMapping: ParentChildMapping = new ParentChildMapping();
  insertRes: any = [];

  displayedColumns = ['Name', 'isActive', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogSellerMappingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public salesService: SalesService,
    private spinner: NgxSpinnerService,
  ) {


    this.mappingForm = this.formBuilder.group({
      mappingID: [''],
      searchResult: ['']
    });

    this.userData = data;
    console.log('edit', this.userData);


    if (this.salesService.currentTab == 'Sub Category Mapping') {
      // backoffice
      console.log('user id', this.userData.id);
      this.userID = this.userData.id + '-sub';
      this.getParentChildMappingData(this.userID);

    }

    if (this.salesService.currentTab == 'Child Seller mapping') {
      this.userID = this.userData.id + '-child';
      this.getParentChildMappingData(this.userID);

    }
    if (this.salesService.currentTab == 'Seller Mapping') {
      //seller mapping (seller tab)
      this.userID = this.userData.id + '-seller';
      this.getParentChildMappingData(this.userID);

    }
    if (this.salesService.currentTab == 'child Seller Mapping') {
      //sales partner
      this.userID = this.userData.id + '-child';
      this.getParentChildMappingData(this.userData.id);

    }
  
    if (this.salesService.currentTab == 'Child seller Mapping') {
      this.userID = this.userData.id + '-child';
      this.getParentChildMappingData(this.userID);
    }

  }
  ngOnInit(): void {
    this.strSellerID = sessionStorage.getItem('sellerId');

  }


  $search = this.search.valueChanges.pipe(
    startWith(null),
    debounceTime(200),
    switchMap((res: string) => {
      console.log('input ', res);
      if (!res) return of(this.parentChildMappingData);
      res = res.toLowerCase();
      return of(
        this.parentChildMappingData.filter(x => x.Name.toLowerCase().indexOf(res) >= 0)
      );
    })
  );


  selectionChange(option: any) {
    console.log(option);
    let value = this.shoesControl.value || [];
    if (option.selected) value.push(option.value);
    else value = value.filter((x: any) => x != option.value);
    this.shoesControl.setValue(value);
  }


  getParentChildMappingData(id) {
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        color: 'white'
      }
    );
    this.salesService.getParentChildMappingBrand(id).subscribe(res => {
      console.log('child mapping', res);
      this.parentChildMappingData = res;

      this.dataSource = new MatTableDataSource(this.parentChildMappingData);
      setTimeout(() => this.dataSource.paginator = this.paginator);

      this.checkMapping(this.parentChildMappingData);
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }


  checkMapping(arr) {

    let isMappingTrue: any = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].isActive == 'true') {
        isMappingTrue.push(arr[i].Child_UserID.toString());
      }
    }
    console.log('isMappingTrue', isMappingTrue);
    this.mappingForm.controls.mappingID.setValue(isMappingTrue);
  }

  updateParentChildMapping(res) {

    this.parentChildMapping.Child_UserID = res.Child_UserID;
    this.parentChildMapping.Name = res.Name;

    if (this.salesService.currentTab == 'Sub Category Mapping') {
      // backoffice
      this.parentChildMapping.Parent_UserID = res.Parent_UserID + '-sub-sub';
    }
    if (this.salesService.currentTab == 'Child seller Mapping') {
      //sales
      this.parentChildMapping.Parent_UserID = res.Parent_UserID + '-child';
    }

    if (this.salesService.currentTab == 'Child seller Mapping') {
      this.parentChildMapping.Parent_UserID = res.Parent_UserID + '-child';
    }

    if (this.salesService.currentTab == 'Child Seller mapping') {
      console.log('seller tab');
      this.parentChildMapping.Parent_UserID = res.Parent_UserID + '-child';
    }
    if (this.salesService.currentTab == 'Seller Mapping') {
      //seller mapping (seller tab)
      this.parentChildMapping.Parent_UserID = res.Parent_UserID + '-seller';
    }
    if (this.salesService.currentTab == 'child Seller Mapping') {
      //sales partner
      this.parentChildMapping.Parent_UserID = res.Parent_UserID + '-child';
    }

    if (res.isActive == 'true') {
      this.parentChildMapping.isCheckbox = false;
      this.parentChildMapping.isActive = 'false';
    }
    else {
      this.parentChildMapping.isCheckbox = true;
      this.parentChildMapping.isActive = 'true';
    }

    this.parentChildMapping.userid = this.strSellerID;

    console.log(' this.parentChildMapping', this.parentChildMapping);
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.salesService.insertParentChildMapping(this.parentChildMapping).subscribe(res => {
      this.insertRes = res;
      if (this.insertRes == 'ok') {
        this.toastr.success('Updated Successfully !!');
        this.getParentChildMappingData(this.userID);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, err => {
      console.log(err);
      this.toastr.error(err.error);
      this.spinner.hide();
    });
  }

  filterListCareUnit(val) {
    let prevParentChildMappingData = this.parentChildMappingData;
    let storeParentChildMappingData = this.parentChildMappingData;
    let finalResult: any;
    if (val.length > 0) {

      finalResult = storeParentChildMappingData.filter((item) => item.Name.toLowerCase().includes(val.toLowerCase()));
    }
    else {
      console.log('inside the else');
      finalResult = prevParentChildMappingData;
    }
    console.log(val);
    this.parentChildMappingData = finalResult;
    return [...this.parentChildMappingData];

  }
  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editUpdateOutStockMsg(res) {
    console.log('clicked', res);
  }
}
