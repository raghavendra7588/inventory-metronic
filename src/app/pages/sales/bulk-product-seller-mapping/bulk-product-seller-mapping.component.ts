import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bulk-product-seller-mapping',
  templateUrl: './bulk-product-seller-mapping.component.html',
  styleUrls: ['./bulk-product-seller-mapping.component.scss']
})
export class BulkProductSellerMappingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  selectedDownloadType(res) {

  }

  selectedSellerName(res) {

  }

  selectFile(e) {
    console.log(e);
    // this.fileData = <File>e.target.files[0];
    // this.isFileUploaded = true;
    // this.fileName = e.target.files[0].name;
  }
}
