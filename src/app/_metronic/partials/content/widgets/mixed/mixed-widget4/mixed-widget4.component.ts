import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentService } from 'src/app/pages/payment/payment.service';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { EmitterService } from 'src/app/shared/emitter.service';
import { SharedService } from 'src/app/shared/shared.service';
import { LayoutService } from '../../../../../core';

@Component({
  selector: 'app-mixed-widget4',
  templateUrl: './mixed-widget4.component.html',
})
export class MixedWidget4Component implements OnInit {
  chartOptions: any = {};
  fontFamily = '';
  colorsGrayGray500 = '';
  colorsGrayGray200 = '';
  colorsGrayGray300 = '';
  colorsThemeBaseDanger = '';
  @Input() cssClass;

  strUserId: string;
  role: string;
  weeklySales: string;
  monthlySales: string;
  yearlySales: string;
  totalSales: string;
  salesData: any = [];
  latestPaymentData: any = [];
  strSellerId: string;


  constructor(
    private layout: LayoutService,
    private reportsService: ReportsService,
    private spinner: NgxSpinnerService,
    private changeDetector: ChangeDetectorRef,
    public paymentService: PaymentService,
    public sharedService: SharedService,
    private router: Router,
    public emitterService: EmitterService
  ) {
    this.fontFamily = this.layout.getProp('js.fontFamily');
    this.colorsGrayGray500 = this.layout.getProp('js.colors.gray.gray500');
    this.colorsGrayGray200 = this.layout.getProp('js.colors.gray.gray200');
    this.colorsGrayGray300 = this.layout.getProp('js.colors.gray.gray300');
    this.colorsThemeBaseDanger = this.layout.getProp(
      'js.colors.theme.base.danger'
    );
  }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.strUserId = sessionStorage.getItem('sellerId');
    this.role = sessionStorage.getItem('role');
    this.chartOptions = this.getChartOptions();
    this.getDashBoardSalesRelatedData();

    if (this.role == 'Seller') {
      this.getLatestPaymentTransaction();
    } else {
      return;
    }


  }

  getDashBoardSalesRelatedData() {
    this.spinner.show();
    this.reportsService.getDashBoardSales(this.strUserId).subscribe(res => {
      this.salesData = res;
      this.weeklySales = this.salesData[1].Week;
      this.monthlySales = this.salesData[1].Month;
      this.yearlySales = this.salesData[1].Year;
      this.totalSales = this.salesData[1].Totall;
      this.changeDetector.detectChanges();

      this.spinner.hide();
    }, err => {

      this.spinner.hide();
    });
  }

  getChartOptions() {
    const strokeColor = '#D13647';
    return {
      series: [{
        name: 'Net Profit',
        data: [35, 65, 75, 55, 45, 60, 55]
      }, {
        name: 'Revenue',
        data: [40, 70, 80, 60, 50, 65, 60]
      }],
      chart: {
        type: 'bar',
        height: '200px',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: ['30%'],
          endingShape: 'rounded'
        },
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        labels: {
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      fill: {
        type: ['solid', 'solid'],
        opacity: [0.25, 1]
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: this.fontFamily
        },
        y: {
          formatter: (val) => {
            return `$ ${val}  thousands`;
          }
        },
        marker: {
          show: false
        }
      },
      colors: ['#ffffff', '#ffffff'],
      grid: {
        borderColor: this.colorsGrayGray200,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          left: 20,
          right: 20
        }
      }
    };
  }

  getLatestPaymentTransaction() {
    this.spinner.show();
    this.paymentService.getLatestTransactionBySeller(Number(this.strSellerId)).subscribe(res => {
      this.latestPaymentData = res;
      sessionStorage.removeItem('subscriptionDetails');
      sessionStorage.setItem('subscriptionDetails', JSON.stringify(this.latestPaymentData));


      var expiryDate = new Date(this.latestPaymentData[0].ExpiryDatee);
      var currentDate = new Date();

      if (expiryDate > currentDate) {

        this.spinner.hide();
        return;
      } else {

        this.sellerStatusChechpoint(this.latestPaymentData[0].PaymenId);
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }


  sellerStatusChechpoint(PaymenId) {
    this.spinner.show();
    this.paymentService.updateSellerStatusCheckpoint(PaymenId).subscribe(res => {

      this.emitterService.isPaymentOrStatusChange.emit(true);
      this.router.navigate(['/payment/subscription']);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }
}
