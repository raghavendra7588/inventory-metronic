import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DocumentData } from '../sales.model.';
import { SalesService } from '../sales.service';
import { ExportToCsv } from 'export-to-csv';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  displayedColumns = ['name', 'fileType', 'file'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;

  sellerData: any = [];
  role: string;
  filteredSellerData: any = [];

  document: DocumentData = new DocumentData();
  isDataLoaded: boolean = false;

  selectedDocument: string;
  isDocumentTypeSelected: boolean = false;
  isFileUploaded: boolean = false;
  filename: string = null;
  fileData: File = null;
  fileName: any;
  @ViewChild('uploadForm') public uploadForm: NgForm;



  newRecordSubscription: Subscription;

  user: any;
  documents: any;
  userRole: string;
  userName: string;
  userId: string;

  strSellerId: string;
  documentsData: any = [];
  isClickedOnce: boolean = false;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  isAdmin: boolean = false;
  particularSellerId: string;
  particularSellerName: string;

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService,
    public toastr: ToastrService,
  ) {
    this.role = sessionStorage.getItem('role');
    this.strSellerId = sessionStorage.getItem('sellerId');
    console.log('current role', this.role);
    if (this.role == 'Admin' || this.role == 'backoffice') {
      this.isAdmin = true;
      this.getSellerUsers();
    }

    this.getDocumentList(this.strSellerId);
    this.emitterService.isAdminCreadtedOrUpdated.subscribe(val => {
      if (val) {
        this.getDocumentList(this.strSellerId);
      }
    });
  }

  ngOnInit(): void {

    this.documents = [
      { id: 0, type: 'Pan Card' },
      { id: 1, type: 'Aadhar Card' },
      { id: 2, type: 'Shop Act' },
      { id: 3, type: 'Cancel Cheque' },
      { id: 4, type: 'Individual Photo Copy' },
      { id: 5, type: 'Shop Photo' },
      { id: 6, type: 'Vendor Photo with Shop' }
    ];
  }

  setDataSourceAttributes() {
    if (Array.isArray(this.dataSource) && this.dataSource.length) {
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }
  }
  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  getSellerUsers() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    let currentRole: string;
    if (this.role == 'Admin' || this.role == 'backoffice') {
      currentRole = 'Seller';
    }
    this.salesService.getSellerUsers(currentRole).subscribe(res => {
      this.sellerData = res;
      this.filteredSellerData = this.sellerData.slice();
      // if (Array.isArray(this.sellerData) && this.sellerData.length) {
      //   this.spinner.hide();
      // }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
    this.filteredSellerData = this.sellerData.slice();
  }



  onFileSelect(e: any): void {
    this.fileData = <File>e.target.files[0];
    this.fileName = e.target.files[0].name;
    this.document.file = this.fileName;
    this.isFileUploaded = true;
  }

  onSellerChange(event, res) {
    this.particularSellerId = res.id;
    this.particularSellerName = res.SellerNameCode;
    console.log('this.particularSellerId', this.particularSellerId);
  }


  onDocumentSubmit() {
    const formData = new FormData();
    this.isClickedOnce = true;
    formData.append('File', this.fileData, this.fileName);
    formData.append('documentType', this.document.documentType);

    console.log('inside upload role', this.role)
    if (this.role == 'Admin' || this.role == 'backoffice') {
      formData.append('userName', this.particularSellerName);
      formData.append('userId', this.particularSellerId);
    }


    if (this.role == 'Seller' || this.role == 'sales' || this.role == 'partner' || this.role == 'backoffice') {
      let shopName = sessionStorage.getItem('sellerName');
      formData.append('userName', shopName);
      formData.append('userId', this.strSellerId);
    }

    formData.append('userRole', this.role);
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );

    console.log('document model', this.document);
    this.salesService.uploadDocuments(formData).subscribe(data => {
      this.emitterService.isAdminCreadtedOrUpdated.emit(true);
      this.toastr.success('File Uploaded Successfully');
      this.isFileUploaded = false;
      this.isClickedOnce = false;
      this.selectedDocument = '';
      this.fileName = '';

      this.document.userName = '';
      this.document.documentType = '';
      this.document.userId = '';
      this.document.userRole = '';
      this.document.file = '';


      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

  }

  selectedDocumentType() {
    this.isDocumentTypeSelected = true;
  }


  getDocumentList(id) {

    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );

    this.salesService.getDocumentsById(id).subscribe(res => {
      console.log('document list', res);
      this.documentsData = res;
      this.dataSource = new MatTableDataSource(this.documentsData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
      this.isDataLoaded = true;
    },
      err => {
        this.spinner.hide();
      });
  }

  downloadTheReport() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Customer Data',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
    };

    const csvExporter = new ExportToCsv(options);
    if (this.isDataLoaded) {
      let requiredResponse = this.formatResponse(this.documentsData);
      csvExporter.generateCsv(requiredResponse);
    }

  }

  formatResponse(array) {
    let formattedResponse: any = [];
    let j = 1;
    for (let i = 0; i < array.length; i++) {

      let item = {
        Number: j,
        name: array[i].name,
        fileType: array[i].fileType,
        descriptions: array[i].descriptions,
        filePath: array[i].filePath
      }
      j++;
      formattedResponse.push(item);
    }
    return formattedResponse;
  }
}
