import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileSaverService } from 'ngx-filesaver';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-bulk-product-seller-mapping',
  templateUrl: './bulk-product-seller-mapping.component.html',
  styleUrls: ['./bulk-product-seller-mapping.component.scss']
})
export class BulkProductSellerMappingComponent implements OnInit {

  allType: any = [];
  type: any;
  seller: any;

  strSellerID: string;
  sellerData: any = [];
  selectedSellerName: string;
  currentUserId: string;

  role: string;
  filteredSellerData: any = [];

  csvData: any;
  filename: string = null;
  fileData: File = null;
  fileName: any;
  uploadedFileName: any;

  constructor(
    public salesService: SalesService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private _FileSaverService: FileSaverService
  ) { }

  ngOnInit(): void {
    this.strSellerID = sessionStorage.getItem('sellerId');
    this.getSellerUsers();
    this.allType = [
      { id: 0, name: 'All Product', title: 'A' },
      { id: 1, name: 'Only Mapped Product', title: 'U' },
      { id: 2, name: 'Only UnMapped Product', title: 'M' }
    ];
  }




  selectFile(e) {
    console.log(e);
    this.fileData = <File>e.target.files[0];
    this.fileName = e.target.files[0].name;
    this.uploadedFileName = this.fileName;
  }


  getSellerUsers() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    let currentRole = '';
    // if (this.role == 'Admin') {
    currentRole = 'Seller';
    // }
    this.salesService.getSellerUsers(currentRole).subscribe(res => {
      this.sellerData = res;
      this.filteredSellerData = this.sellerData.slice();
      if (Array.isArray(this.sellerData) && this.sellerData.length) {
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
    });
    this.filteredSellerData = this.sellerData.slice();
  }
  selectedDownloadType(res) {

  }
  onSellerChange(event, res) {
    this.seller = res.id;
  }


  downloadCsv() {
    this.salesService.downloadProductCsv(this.seller, this.type).subscribe(res => {
      this.csvData = res;
      console.log('csv file', res);
    },
      err => {
        this.toastr.error('An Error Occured');
      });

    // let myBlob = new Blob([this.csvData], { type: 'application/vnd.oasis.opendocument.spreadsheet' });
    // let downloadUrl = URL.createObjectURL(myBlob);

    // let a = document.createElement('a');
    // a.href = downloadUrl;
    // a.download = 'report.csv';

    // a.click();
  }

  onDown(type: string, fromRemote: boolean, res: any) {
    const fileName = `save.${type}`;
    if (fromRemote) {
      this._FileSaverService.save(res, fileName);
      return;
    }
    const fileType = this._FileSaverService.genType(fileName);
    const txtBlob = new Blob([res], { type: fileType });
    this._FileSaverService.save(txtBlob, fileName);
  }

  uploadCsv() {
    const formData = new FormData();
    formData.append('uploadedFiles', this.fileData, this.fileName);
    formData.append('SellerId', this.seller);
    formData.append('UserId', this.strSellerID);

    this.salesService.uploadBulkProductsCsv(formData).subscribe(res => {
        this.toastr.success('Uploaded Successfully !!');
    });
  }
}
