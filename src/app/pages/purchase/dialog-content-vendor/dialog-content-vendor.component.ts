import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/modules/auth/login.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { Address, Vendor } from '../purchase.model';
import { PurchaseService } from '../purchase.service';


@Component({
  selector: 'app-dialog-content-vendor',
  templateUrl: './dialog-content-vendor.component.html',
  styleUrls: ['./dialog-content-vendor.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS
    }
  ]
})
export class DialogContentVendorComponent implements OnInit {

  panelOpenState = false;

  categorySettings = {};
  subCategorySettings = {};
  brandSettings = {};


  allCategoryData: any = [];
  documents: any;
  labelPosition: 'before' = 'before';
  selectedTerm: any;
  selectedCategory: any;
  selectedTransporter: any;
  vendor: Vendor = new Vendor();
  paymentTerm: any;
  paymentCategory: any;
  transporters: any;
  subCategories: any = [];
  subProducts: any = [];
  selectedSubCategoriesId: any = [];
  getEveryBrandItem: any = [];
  filteredBrandItem: any = [];
  public multipleBrandArray: any = [];
  array1: any = [];
  array2: any = [];
  array3: any = [];
  fullDate: any;
  fileData: File = null;
  fileName: any;
  isFileUploaded: boolean = false;
  subCategoriesArray: any = [];
  categoriesArray: any = [];
  brandArray: any = [];
  maxLengthGst = 15;
  maxLengthPan = 10;
  maxLengthAccountNumber = 18;
  maxLengthIfsc = 11;
  maxLengthCin = 21;
  maxLengthPinCode = 6;
  maxLengthPhone = 10;
  maxLengthCreditLimit = 3;
  datePicker: any;
  formattedDate: any;
  parentid = 3;
  SubCategoryId: string;
  vendorData: any;
  isImageUploaded: boolean;
  isDateSelected: boolean;
  getAddressData: Address;
  multipleCategoriesArray: any = [];
  categoriesArray1: any = [];
  categoriesArray2: any = [];
  categoriesArray3: any = [];
  currentBillingId: string;
  currentShippingId: string;
  storageSellerId: number;
  maxDate: any;
  uniqueBrandNamesArray: any = [];
  anyArray: any = [];
  subCategoryNamesArray: any = [];
  masterBrandData: any = [];
  vendorDetails: any = [];
  selectedBrandArray: any = [];
  selectedSubCategoryArray: any = [];
  selectedCategoryArray: any = [];
  selectedBrandString: string;
  selectedSubCategoryString: string;
  selectedCategoryString: string;
  finalBrandArray: any = [];
  multipleBrands: any = [];
  brands1: any = [];
  brands2: any = [];
  brands3: any = [];
  subCategoryForm: FormControl;
  saveVendorForm: FormGroup;
  AccountType: any;

  selectedItems = [];
  dropdownSettings = {};
  dataList = [];

  selectedCategoryIdArray: any = [];
  selectedSubCategoryIdArray: any = [];
  selectedBrandIdArray: any = [];
  sellerName: string;
  sellerId: any;
  categoryId: any;
  AllCategoryArray: any = [];
  AllSubCategoryArray: any = [];
  strSellerId: string;
  onlyNumeric = '/^[0-9\b]+$/';
  prevBrand: string;
  prevSubCategory: string;
  prevCategory: string;



  constructor(public purchaseService: PurchaseService,
    public loginService: LoginService,
    public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public emitterService: EmitterService,
    public router: Router,
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogContentVendorComponent>,
    private spinner: NgxSpinnerService) {

    this.strSellerId = sessionStorage.getItem('sellerId');
    this.sellerName = sessionStorage.getItem('sellerName');
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    // this.itemMaster.sellerId = sessionStorage.getItem('sellerId').toString();
    this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));
    let sortedData = this.sortArrayInAscendingOrder(this.loginService.seller_object.categories);
    this.loginService.seller_object.categories = [];
    this.loginService.seller_object.categories = sortedData;
    // this.getAllCategoryData();
    this.vendorData = data;
    this.categorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.subCategorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.brandSettings = {
      singleSelection: false,
      idField: 'BrandID',
      textField: 'BrandName',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.getAddressDetails();
    this.getMasterBrandData();
    this.getVendorData();

    this.vendor.code = 'GVV';
    if (this.vendorData) {


      this.vendor.code = this.vendorData.code;
      this.isImageUploaded = true;
      this.prevBrand = this.vendorData.brand;
      this.prevSubCategory = this.vendorData.subCategory
      this.prevCategory = this.vendorData.category;

    }

    this.saveVendorForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      code: [''],
      underLedger: [''],
      contactPerson: [''],
      PrintName: [''],
      category: [''],
      subCategory: [''],
      brand: [''],
      gst: [''],
      pan: [''],
      gstCategory: [''],
      datePicker: [''],
      distance: [''],
      cin: [''],
      creditLimitDays: [''],
      priceCategory: [''],
      selectedTransporter: [''],
      agentBroker: [''],
      creditLimit: [''],
      ifscCode: [''],
      accountNumber: [''],
      bankName: [''],
      branch: [''],
      inputFiles: [''],
      address: [''],
      city: [''],
      state: [''],
      pinCode: [''],
      country: [''],
      phone: [''],
      email: [''],
      accountName: [''],
      accountType: ['']
    });
    this.assignData();
    this.saveVendorForm.get('country').disable();
    this.saveVendorForm.get('code').disable();
    this.vendor.registrationDate = new Date();

  }

  ngOnInit(): void {
    this.vendor.sellerId = sessionStorage.getItem('sellerId');
    this.paymentCategory = [
      { id: 0, title: 'Not Applicable' },
      { id: 1, title: 'Scheme' },
      { id: 2, title: 'Non Scheme' },
    ];

    this.transporters = [
      { id: 0, title: 'Not Applicable' },
      { id: 1, title: 'From Vendor' },
      { id: 2, title: 'Own' },
    ];

    this.AccountType = [
      { id: 0, title: 'Saving' },
      { id: 1, title: 'Current' },
      { id: 2, title: 'Other' },
    ];

    this.isImageUploaded = false;

    this.vendor.Country = 'India';


  }

  getAllCategoryData() {
    this.spinner.show();
    this.purchaseService.getAllCategories(this.strSellerId).subscribe(res => {
      this.allCategoryData = res;
      let sortedData = this.sortArrayInAscendingOrder(this.allCategoryData);
      this.loginService.seller_object.categories = [];
      this.loginService.seller_object.categories = sortedData;
      this.spinner.hide();
    });
  }

  selectedBillingAddress(event, adr) {
    this.currentBillingId = adr.id.toString();
  }

  selectedShippingAddress(event, address) {
    this.currentShippingId = address.id.toString();
  }


  copyVendorName(event) {
    this.vendor.printName = event;
  }


  onCategorySelectAll() {
    this.purchaseService.getEveryBrand().subscribe(data => {

      this.AllCategoryArray = data;

      let uniqueBrandName = this.createUniqueBrandName(this.AllCategoryArray);
      this.anyArray = this.sortUniqueBrandName(uniqueBrandName);

    },
      err => {
        this.toastr.error('An Error Occured !!');
      });

  }

  onCategorySelectAllList(event) {

  }
  onCategoryDeSelectAll(event) {

  }

  onSubCategorySelectAll() {


    this.purchaseService.getEachBrand(this.categoryId.toString(), '0').subscribe(data => {
      this.AllSubCategoryArray = data;
      let uniqueBrands = this.createUniqueBrandName(this.AllSubCategoryArray);
      this.anyArray = this.sortUniqueBrandName(uniqueBrands);
    },
      err => {
        this.toastr.error('An Error Occured !!');
      });
  }

  onBrandSelectAll() {

  }


  onCategorySelect(event) {

    this.selectedCategoryIdArray.push(event.id);

    this.purchaseService.getAllSubCategories(event.id).subscribe(data => {

      if (this.multipleCategoriesArray.length === 0) {
        this.multipleCategoriesArray = data;
        let sortedSubCategory = this.sortArrayInAscendingOrder(this.multipleCategoriesArray);
        this.multipleCategoriesArray = [];
        this.multipleCategoriesArray = sortedSubCategory;
      }
      else {
        this.categoriesArray2 = data;
        this.categoriesArray3 = [...this.multipleCategoriesArray, ...this.categoriesArray2];
        this.multipleCategoriesArray = this.categoriesArray3;
        let sortedSubCategory = this.sortArrayInAscendingOrder(this.multipleCategoriesArray);
        this.multipleCategoriesArray = [];
        this.multipleCategoriesArray = sortedSubCategory;
      }
    },
      err => {
        this.toastr.error('An Error Occured !!');
      });



  }

  onCategoryDeSelect(event) {

    let remainingCategoriesArray = this.multipleCategoriesArray.filter(function (item) {
      return Number(item.parentid) !== Number(event.id);
    });
    this.multipleCategoriesArray = [];
    this.multipleCategoriesArray = remainingCategoriesArray;

    if (this.multipleCategoriesArray.length === 0) {
      this.multipleCategoriesArray = [];
      this.anyArray = [];
      this.selectedSubCategoryIdArray = [];
      this.selectedBrandIdArray = [];

    }

    const index = this.selectedCategoryIdArray.indexOf(event.id);
    if (index > -1) {
      this.selectedCategoryIdArray.splice(index, 1);
    }

  }




  onSubCategorySelect(event, data) {

    this.selectedSubCategoryIdArray.push(event.id);


    this.purchaseService.getAllBrand(data[0].parentid, event.id).subscribe(data => {
      if (this.multipleBrandArray.length === 0) {
        this.multipleBrandArray = data;
      }
      else {
        this.array2 = data;
        this.array3 = [...this.multipleBrandArray, ...this.array2];
        this.multipleBrandArray = this.array3;
      }
      this.uniqueBrandNamesArray = this.createUniqueBrandName(this.multipleBrandArray);
      this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
      this.subCategoryNamesArray = this.multipleBrandArray;
    },
      err => {
        this.toastr.error('An Error Occured !!');
      });
  }

  onSubCategoryDeSelect(event) {
    let newArr = this.anyArray.filter(function (item) {
      return Number(item.SubCategoryID) != Number(event.id);
    });
    this.anyArray = [];
    this.anyArray = newArr;
    const subCategoryIndex = this.selectedSubCategoryIdArray.indexOf(event.id);
    if (subCategoryIndex > -1) {
      this.selectedSubCategoryIdArray.splice(subCategoryIndex, 1);
    }

    if (this.multipleCategoriesArray.length === 0) {
      this.anyArray = [];
    }

  }


  onBrandSelect(event) {

    this.selectedBrandIdArray.push(event.BrandID);


    if (this.finalBrandArray.length === 0) {
      let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
        return item.BrandName.trim() === event.BrandName;
      });
      let sortedBrandArray = this.sortUniqueBrandName(filteredBrandArray);
      this.finalBrandArray = sortedBrandArray;

    }
    else {
      this.brands1 = this.multipleBrandArray.filter(function (item) {
        return item.BrandName.trim() === event.BrandName;
      });
      this.brands2 = this.brands1;
      this.brands3 = [...this.finalBrandArray, ...this.brands2];
      this.finalBrandArray = this.brands3;

    }
  }

  onBrandDeSelect(event) {

    let tempArr = this.finalBrandArray.filter(function (item) {
      return item.BrandName.trim() != event.BrandName;
    });
    this.finalBrandArray = tempArr;


    const brandIndex = this.selectedBrandIdArray.indexOf(event.BrandID);
    if (brandIndex > -1) {
      this.selectedBrandIdArray.splice(brandIndex, 1);

    }


  }


  onCategoriesChange(event, category: any) {

    this.categoryId = category.id;

    this.selectedCategoryIdArray.push(category.id);



    if (event.isUserInput) {
      if (event.source.selected) {
        this.categoriesArray.push(category.id);
        this.spinner.show();
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {

          if (this.multipleCategoriesArray.length === 0) {
            this.multipleCategoriesArray = data;
          }
          else {
            this.categoriesArray2 = data;
            this.categoriesArray3 = [...this.multipleCategoriesArray, ...this.categoriesArray2];
            this.multipleCategoriesArray = this.categoriesArray3;
          }
          this.spinner.hide();
        },
          err => {
            this.toastr.error('An Error Occured !!');
          });

      }
    }

    if (!event.source.selected) {

      let newCategoriesArr = this.multipleCategoriesArray.filter(function (item) {

        return Number(item.parentid) !== Number(category.id);
      });

      this.multipleCategoriesArray = newCategoriesArr;
      const index = this.categoriesArray.indexOf(category.id);
      if (index > -1) {
        this.categoriesArray.splice(index, 1);
      }


      let uniqueCategoryIdArray = [...new Set(this.selectedCategoryIdArray)];


      const indexx = uniqueCategoryIdArray.indexOf(category.id);

      if (indexx > -1) {
        uniqueCategoryIdArray.splice(indexx, 1);
      }

      this.selectedCategoryIdArray = uniqueCategoryIdArray;


    }
  }

  onSubCategoriesChange(event, subCategory: any) {
    if (event.isUserInput) {
      if (event.source.selected) {


        this.selectedSubCategoryIdArray.push(subCategory.id);

        this.purchaseService.getAllBrand(subCategory.parentid, subCategory.id).subscribe(data => {
          if (this.multipleBrandArray.length < 2 && this.array3 < 1) {
            this.multipleBrandArray = data;
          }
          else {
            this.array2 = data;
            this.array3 = [...this.multipleBrandArray, ...this.array2];
            this.multipleBrandArray = this.array3;
          }
          this.uniqueBrandNamesArray = this.createUniqueBrandName(this.multipleBrandArray);
          this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          this.subCategoryNamesArray = this.multipleBrandArray;

        },
          err => {
            this.toastr.error('An Error Occured !!');
          });
      }
    }
    if (!event.source.selected) {

      let newArr = this.multipleBrandArray.filter(function (item) {
        return Number(item.SubCategoryID) != Number(subCategory.id);
      });

      this.multipleBrandArray = newArr;
      this.uniqueBrandNamesArray = this.createUniqueBrandName(this.multipleBrandArray);
      this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
      const index = this.subCategoriesArray.indexOf(subCategory.id);
      if (index > -1) {
        this.subCategoriesArray.splice(index, 1);
      }


      let uniqueSubCategoryIdArray = [...new Set(this.selectedSubCategoryIdArray)];


      const indexx = uniqueSubCategoryIdArray.indexOf(subCategory.id);

      if (indexx > -1) {
        uniqueSubCategoryIdArray.splice(indexx, 1);
      }

      this.selectedSubCategoryIdArray = uniqueSubCategoryIdArray;

    }
  }



  onProductChange(event, product: any) {
    if (event.isUserInput) {
      if (event.source.selected) {


        this.selectedBrandIdArray.push(product.BrandID);

        if (this.finalBrandArray.length === 0) {
          let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
            return item.BrandName.trim() === product.BrandName
          });
          let selectedBrandId = filteredBrandArray[0].BrandID;
          this.brandArray.push(selectedBrandId);

        }
        else {
          this.brands1 = this.multipleBrandArray.filter(function (item) {
            return item.BrandName.trim() === product.BrandName
          });
          this.brands2 = this.brands1;
          this.brands3 = [...this.finalBrandArray, ...this.brands2];
          this.finalBrandArray = this.brands3;
        }

      }
      if (!event.source.selected) {


        var tempArr = this.finalBrandArray.filter(function (item) {
          return item.BrandName.trim() != product.BrandName;
        });
        this.finalBrandArray = tempArr;
        const index = this.brandArray.indexOf(product.ProductID);
        if (index > -1) {
          this.brandArray.splice(index, 1);
        }
        console.log('before removed  this.selectedCategoryIdArray', this.selectedBrandIdArray);

        let uniqueBrandIdArray = [...new Set(this.selectedBrandIdArray)];


        const indexx = uniqueBrandIdArray.indexOf(product.BrandID);

        if (indexx > -1) {
          uniqueBrandIdArray.splice(indexx, 1);
        }

        this.selectedBrandIdArray = uniqueBrandIdArray;

      }
    }
  }


  valueChanged() {
    let date = new Date(this.vendor.registrationDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")

    const day = `${date.getDate()}`.padStart(2, "0")

    const stringDate = [day, month, year].join("/");
    this.fullDate = stringDate;
    return this.fullDate
  }

  selectedSubCategory() {

  }


  onBrandChange() {

  }

  selectePaymentTerm() {


  }

  selectePriceCategory() {

  }

  selectedTransporterDetail() {

  }


  onFileSelect(e: any): void {
    this.fileData = <File>e.target.files[0];
    this.vendor.fileUpload = e.target.files[0].name;
    this.isImageUploaded = true;
  }


  saveVendor() {
    const formData = new FormData();
    if (this.isImageUploaded) {
      formData.append('File', this.fileData, this.vendor.fileUpload);
      formData.append('FileName', this.vendor.fileUpload);
    }


    if (this.vendorData) {
      formData.append('vendorId', this.vendorData.vendorId);
    }
    else {

      formData.append('vendorId', '0');
    }


    if (this.vendor.name === null || this.vendor.name === undefined || this.vendor.name === '') {
      formData.append('name', '');
    }
    else {
      formData.append('name', this.vendor.name);
    }


    if (this.vendor.code === null || this.vendor.code === undefined || this.vendor.code === '') {
      formData.append('code', '');
    }
    else {
      formData.append('code', this.vendor.code);
    }

    if (this.vendor.underLedger === null || this.vendor.underLedger === undefined || this.vendor.underLedger === '') {
      formData.append('underLedger', '');
    }
    else {
      formData.append('underLedger', this.vendor.underLedger);
    }

    if (this.vendor.contactPerson === null || this.vendor.contactPerson === undefined || this.vendor.contactPerson === '') {
      formData.append('contactPerson', '');
    }
    else {
      formData.append('contactPerson', this.vendor.contactPerson);
    }


    if (this.vendor.printName === null || this.vendor.printName === undefined || this.vendor.printName === '') {
      formData.append('printName', '');
    }
    else {
      formData.append('printName', this.vendor.printName);
    }


    if (this.vendor.gst === null || this.vendor.gst === undefined || this.vendor.gst === '') {
      formData.append('gst', '');
    }
    else {
      formData.append('gst', this.vendor.gst);
    }

    if (this.vendor.gstCategory === null || this.vendor.gstCategory === undefined || this.vendor.gstCategory === '') {
      formData.append('gstCategory', '');
    }
    else {
      formData.append('gstCategory', this.vendor.gstCategory);
    }


    if (this.vendor.pan === null || this.vendor.pan === undefined || this.vendor.pan === '') {
      formData.append('pan', '');
    }
    else {
      formData.append('pan', this.vendor.pan);
    }

    if (this.vendor.registrationDate === null || this.vendor.registrationDate === undefined) {
      formData.append('registrationDate', '');
    }
    else {
      this.fullDate = this.valueChanged();
      formData.append('registrationDate', this.fullDate.toString());
    }

    if (this.vendor.distance === null || this.vendor.distance === undefined || this.vendor.distance === '') {
      formData.append('distance', '');
    }
    else {
      formData.append('distance', this.vendor.distance);
    }

    if (this.vendor.cin === null || this.vendor.cin === undefined) {
      formData.append('cin', "0");
    }
    else {
      formData.append('cin', this.vendor.cin.toString());
    }

    if (this.vendor.creditLimitDays === null || this.vendor.creditLimitDays === undefined || this.vendor.creditLimitDays === '') {
      formData.append('creditLimitDays', "0");
    }
    else {
      formData.append('creditLimitDays', this.vendor.creditLimitDays);
    }


    if (this.vendor.priceCategory === null || this.vendor.priceCategory === undefined || this.vendor.priceCategory === '') {
      formData.append('priceCategory', '');
    }
    else {
      formData.append('priceCategory', this.vendor.priceCategory);
    }


    if (this.vendor.transporter === null || this.vendor.transporter === undefined || this.vendor.transporter === '') {
      formData.append('transporter', '');
    }
    else {
      formData.append('transporter', this.vendor.transporter);
    }


    if (this.vendor.agentBroker === null || this.vendor.agentBroker === undefined || this.vendor.agentBroker === '') {
      formData.append('agentBroker', '');
    }
    else {
      formData.append('agentBroker', this.vendor.agentBroker);
    }


    if (this.vendor.agentBroker === null || this.vendor.creditLimit === undefined) {
      formData.append('creditLimit', "0");
    }
    else {
      formData.append('creditLimit', this.vendor.creditLimit.toString());
    }


    if (this.vendor.ifscCode === null || this.vendor.ifscCode === undefined) {
      formData.append('ifscCode', '');
    }
    else {
      formData.append('ifscCode', this.vendor.ifscCode.toString());
    }


    if (this.vendor.bankName === null || this.vendor.bankName === undefined || this.vendor.bankName === '') {
      formData.append('bankName', '');
    }
    else {
      formData.append('bankName', this.vendor.bankName);
    }


    if (this.vendor.branch === null || this.vendor.branch === undefined || this.vendor.branch === '') {
      formData.append('branch', '');
    }
    else {
      formData.append('branch', this.vendor.branch);
    }


    if (this.vendor.accountNumber === null || this.vendor.accountNumber === undefined) {
      formData.append('accountNumber', "0");
    }
    else {
      formData.append('accountNumber', this.vendor.accountNumber.toString());
    }



    if (this.vendor.Address === null || this.vendor.Address === undefined || this.vendor.Address === '') {
      formData.append('address', '');
    }
    else {
      formData.append('address', this.vendor.Address);
    }



    if (this.vendor.City === null || this.vendor.City === undefined || this.vendor.City === '') {

      formData.append('city', '');
    }
    else {
      formData.append('city', this.vendor.City);
    }

    if (this.vendor.State === null || this.vendor.State === undefined || this.vendor.State === '') {

      formData.append('state', '');
    }
    else {
      formData.append('state', this.vendor.State);
    }


    if (this.vendor.PinCode === null || this.vendor.PinCode === undefined || this.vendor.PinCode === '') {

      formData.append('pinCode', '');
    }
    else {
      formData.append('pinCode', this.vendor.PinCode);
    }

    if (this.vendor.Country === null || this.vendor.Country === undefined || this.vendor.Country === '') {

      formData.append('country', '');
    }
    else {
      formData.append('country', this.vendor.Country);
    }

    if (this.vendor.Phone === null || this.vendor.Phone === undefined || this.vendor.Phone === '') {
      formData.append('phone', '');
    }
    else {
      formData.append('phone', this.vendor.Phone);
    }

    if (this.vendor.Email === null || this.vendor.Email === undefined || this.vendor.Email === '') {
      formData.append('email', '');
    }
    else {
      formData.append('email', this.vendor.Email);
    }

    if (this.vendor.accountName === null || this.vendor.accountName === undefined || this.vendor.accountName === '') {
      formData.append('accountName', '');
    }
    else {
      formData.append('accountName', this.vendor.accountName);
    }

    if (this.vendor.accountType === null || this.vendor.accountType === undefined || this.vendor.accountType === '') {
      formData.append('accountType', '');
    }
    else {
      formData.append('accountType', this.vendor.accountType);
    }



    let categoriesValue = this.saveVendorForm.get('category').value;
    let subCategoriesValue = this.saveVendorForm.get('subCategory').value;
    let brandValue = this.saveVendorForm.get('brand').value;
    console.log('cat ng mdoel', this.vendor.category);
    if (categoriesValue === undefined || categoriesValue === null || categoriesValue === '') {
      formData.append('category', "");
    } else {
      let categoryStr = '';

      if (this.vendorData) {
        //edit mode

        let nonDuplicateCategory = [... new Set(this.selectedCategoryIdArray)];
        categoryStr = nonDuplicateCategory.toString();


        let concatCategoryStr = categoryStr.concat(",").concat(this.prevCategory);
        let nonDuplicateCategoryStr = Array.from(new Set(concatCategoryStr.split(','))).toString();


        let formattedCategoryString = nonDuplicateCategoryStr.replace(',,', ',');


        let finalCategoryString = formattedCategoryString.split(',').map(e => e.trim()).filter(e => e).join(', ');
        console.log('no comma ', finalCategoryString);
        formData.append('category', finalCategoryString);

      }
      else {
        //normal mode

        let nonDuplicateCategory = [... new Set(this.selectedCategoryIdArray)];
        categoryStr = nonDuplicateCategory.toString();
        let formattedCategoryString = categoryStr.replace(',,', ',');
        let finalCategoryString = formattedCategoryString.split(',').map(e => e.trim()).filter(e => e).join(', ');
        console.log('no comma ', finalCategoryString);
        formData.append('category', formattedCategoryString.toString());
      }


    }
    // console.log();
    if (subCategoriesValue === undefined || subCategoriesValue === null || subCategoriesValue === '') {
      formData.append('subCategory', "");
    } else {
      let SubCategorystr = '';


      if (this.vendorData) {
        //edit mode
        let nonDuplicateSubCategory = [... new Set(this.selectedSubCategoryIdArray)];
        SubCategorystr = nonDuplicateSubCategory.toString();

        let concatSubCategoryStr = SubCategorystr.concat(",").concat(this.prevSubCategory);
        let nonDuplicateSubCategoryStr = Array.from(new Set(concatSubCategoryStr.split(','))).toString();

        let formattedSubCategoryString = nonDuplicateSubCategoryStr.replace(',,', ',');
        let finalSubCategoryString = formattedSubCategoryString.split(',').map(e => e.trim()).filter(e => e).join(', ');
        console.log('no comma sub', finalSubCategoryString);

        formData.append('subCategory', finalSubCategoryString);
      }
      else {
        //normal mode

        let nonDuplicateSubCategory = [... new Set(this.selectedSubCategoryIdArray)];
        SubCategorystr = nonDuplicateSubCategory.toString();
        let formattedSubCategoryString = SubCategorystr.replace(',,', ',');
        let finalSubCategoryString = formattedSubCategoryString.split(',').map(e => e.trim()).filter(e => e).join(', ');
        console.log('no comma sub', finalSubCategoryString);
        formData.append('subCategory', formattedSubCategoryString);
      }

    }

    if (brandValue === undefined || brandValue === null || brandValue === '') {
      formData.append('brand', "");
    } else {
      let brandStr = '';

      if (this.vendorData) {
        //edit mode
        let nonDuplicateBrand = [... new Set(this.selectedBrandIdArray)];
        brandStr = nonDuplicateBrand.toString();
        let concatBrandStr = brandStr.concat(",").concat(this.prevBrand);
        let nonDuplicateBrandStr = Array.from(new Set(concatBrandStr.split(','))).toString();
        let formattedBrandString = nonDuplicateBrandStr.replace(',,', ',');
        let finalBrandString = formattedBrandString.split(',').map(e => e.trim()).filter(e => e).join(', ');
        console.log('no comma brand', finalBrandString);

        formData.append('brand', finalBrandString);

      }
      else {
        //normal mode

        let nonDuplicateBrand = [... new Set(this.selectedBrandIdArray)];
        brandStr = nonDuplicateBrand.toString();
        let formattedBrandString = brandStr.replace(',,', ',');
        let finalBrandString = formattedBrandString.split(',').map(e => e.trim()).filter(e => e).join(', ');
        console.log('no comma brand', finalBrandString);
        formData.append('brand', finalBrandString);
      }

    }

    formData.append('sellerId', this.vendor.sellerId);
    this.purchaseService.saveVendorMaster(formData).subscribe(data => {
      this.toastr.success('Vendor added Successfully!');
      this.emitterService.isVendorMasterUpdated.emit(true);
      this.dialogRef.close();
    },
      err => {
        this.toastr.error('An Error Occured !!');
      });

  }

  assignData() {
    if (this.vendorData) {
      console.log(this.vendorData);
      this.vendor.code = this.vendorData.code;
      this.vendor.underLedger = this.vendorData.underLedger;
      this.vendor.name = this.vendorData.name;
      this.vendor.contactPerson = this.vendorData.contactPerson;
      this.vendor.printName = this.vendorData.printName;
      this.vendor.gst = this.vendorData.gst;


      this.vendor.brand = this.vendorData.brand;
      this.vendor.gstCategory = this.vendorData.gstCategory;
      this.vendor.pan = this.vendorData.pan;
      this.vendor.distance = this.vendorData.distance;
      this.vendor.cin = this.vendorData.cin;
      this.vendor.creditLimitDays = this.vendorData.creditLimitDays;
      this.vendor.priceCategory = this.vendorData.priceCategory;
      this.vendor.transporter = this.vendorData.transporter;
      if (this.vendorData.registrationDate !== 'NULL' || this.vendorData.registrationDate === '') {
        this.vendor.registrationDate = this.vendorData.registrationDate;
        let dateString = this.vendorData.registrationDate;
        let dateParts = dateString.split("/");
        let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        this.vendor.registrationDate = dateObject;
      }
      else {
        this.vendorData.registrationDate = '';
      }

      this.vendor.agentBroker = this.vendorData.agentBroker;
      this.vendor.creditLimit = this.vendorData.creditLimit;
      this.vendor.ifscCode = this.vendorData.ifscCode;
      this.vendor.accountNumber = this.vendorData.accountNumber;
      this.vendor.bankName = this.vendorData.bankName;
      this.vendor.branch = this.vendorData.branch;
      this.vendor.Address = this.vendorData.address;
      this.vendor.City = this.vendorData.city;
      this.vendor.PinCode = this.vendorData.pinCode;
      this.vendor.State = this.vendorData.state;
      this.vendor.Country = this.vendorData.country;
      this.vendor.Phone = this.vendorData.phone;
      this.vendor.Email = this.vendorData.email;
      this.vendor.accountType = this.vendorData.accountType;
    }

  }

  getAddressDetails() {
    this.purchaseService.getAddressData().subscribe(data => {
      this.getAddressData = data;
    },
      err => {
        this.toastr.error('An Error Occured !!');
      });
  }

  getMasterBrandData() {
    this.purchaseService.getEveryBrand().subscribe(data => {
      this.masterBrandData = data;
    },
      err => {
        this.toastr.error('An Error Occured !!');
      });
  }

  getVendorData() {
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorDetails = data;
    },
      err => {
        this.toastr.error('An Error Occured !!');
      });
  }

  createUniqueBrandName(array: any) {
    let sortedArray: Array<any> = [];
    for (let i = 0; i < array.length; i++) {
      if ((sortedArray.findIndex(p => p.BrandName.trim() == array[i].BrandName.trim())) == -1) {
        var item = { BrandName: array[i].BrandName.trim(), SubCategoryID: array[i].SubCategoryID, BrandID: array[i].BrandID }
        sortedArray.push(item);
      }
    }
    return sortedArray;
  }
  sortUniqueBrandName(array) {
    array.sort((a, b) => {
      return a.BrandName.localeCompare(b.BrandName);
    });
    return array
  }

  sortArrayInAscendingOrder(array) {
    array.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return array;
  }

  ngOnDestroy() {
    this.isImageUploaded = false;
  }

}
