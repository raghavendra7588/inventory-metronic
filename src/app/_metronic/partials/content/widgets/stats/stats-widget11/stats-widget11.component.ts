import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import * as _ from 'lodash';
import { EmitterService } from 'src/app/shared/emitter.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MonthData } from 'src/app/pages/reports/reports.model';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-stats-widget11',
  templateUrl: './stats-widget11.component.html',
  styleUrls: ['./stats-widget11.component.scss']
})
export class StatsWidget11Component implements OnInit {
  @Input() cssClass;
  @Input() symbolShape;
  @Input() baseColor;
  chartOptions: any = {};

  chartOptionsByWeeklyVendor: any = {};
  fontFamily = '';
  colorsGrayGray500 = '';
  colorsGrayGray200 = '';
  colorsGrayGray300 = '';
  colorsThemeBase = '';
  colorsThemeLight = '';
  symbolCSSClasses = '';
  svgCSSClasses = '';

  strSellerId: string;

  purchaseAmountByWeek: any = [];
  totalPurchaseAmount: number;
  seriesPurchaseAmountPerWeek: any = [];


  purchaseAmountByMonth: any = [];
  totalPurchaseAmountByMonth: number;
  seriesPurchaseAmountByMonth: any = [];

  VendorsByWeekly: any = [];
  totalVendorsByWeekly: number;
  seriesVendorsByWeekly: any = [];

  VendorsByMonthly: any = [];
  totalVendorsByMonthly: number;
  seriesVendorsByMonthly: any = [];

  isPurchaseWeekSubscription: Subscription

  isActiveMonth: string = 'weekly';
  isActiveByVendor: string = 'byPurchaseValue';


  monthData: MonthData = new MonthData();

  constructor(
    private layout: LayoutService,
    private reportsService: ReportsService,
    private emitterService: EmitterService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef) {

    let startOfMonth = moment().clone().startOf('month').format("DD/MM/YYYY");
    this.monthData.startDateOfMonth = startOfMonth;

  }

  loadLayoutView() {
    this.fontFamily = this.layout.getProp('js.fontFamily');
    this.colorsGrayGray500 = this.layout.getProp('js.colors.gray.gray500');
    this.colorsGrayGray200 = this.layout.getProp('js.colors.gray.gray200');
    this.colorsGrayGray300 = this.layout.getProp('js.colors.gray.gray300');
    this.colorsThemeBase = this.layout.getProp(
      `js.colors.theme.base.${this.baseColor}`
    );

    this.colorsThemeLight = this.layout.getProp(
      `js.colors.theme.light.${this.baseColor}`
    );


  }

  ngOnInit(): void {
    if (!this.baseColor) {
      this.baseColor = 'success';
    }

    if (!this.symbolShape) {
      this.symbolShape = 'symbol-circle';
    }
    this.loadLayoutView();
    this.symbolCSSClasses = `symbol ${this.symbolShape} symbol-50 symbol-light-${this.baseColor} mr-2`;
    this.svgCSSClasses = `svg-icon svg-icon-xl svg-icon-${this.baseColor}`;


    this.strSellerId = sessionStorage.getItem('sellerId').toString();

    this.monthData.sellerId = this.strSellerId;

    this.getPurchaseAmountByVendors(this.strSellerId);
    this.getPurchaseAmountByPerWeek(this.strSellerId);
    this.getPurchaseMonthDataByMonth();
    this.getPurchaseAmountByMonthByVendors();


    if (this.isActiveByVendor === 'byPurchaseValue' && this.isActiveMonth === 'weekly') {
      this.chartOptions = this.getChartOptions();
    }

  }

  getChartOptions() {
    return {
      series: [{
        name: 'Purchase',
        data: this.seriesPurchaseAmountPerWeek
      }],
      chart: {
        type: 'area',
        height: 150,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'solid',
        opacity: 1
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.colorsThemeBase]
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
            return `${val} Rs`;
          }
        }
      },
      colors: [this.colorsThemeLight],
      markers: {
        colors: [this.colorsThemeLight],
        strokeColor: [this.colorsThemeBase],
        strokeWidth: 3
      }
    };
  }


  getChartOptionsByMonth() {
    return {
      series: [{
        name: 'Purchase',
        data: this.seriesPurchaseAmountByMonth
      }],
      chart: {
        type: 'area',
        height: 150,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'solid',
        opacity: 1
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.colorsThemeBase]
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
            return `${val} Rs`;
          }
        }
      },
      colors: [this.colorsThemeLight],
      markers: {
        colors: [this.colorsThemeLight],
        strokeColor: [this.colorsThemeBase],
        strokeWidth: 3
      }
    };
  }


  getChartOptionsByVendorsWeekly() {
    return {
      series: [{
        name: 'Vendors',
        data: this.seriesVendorsByWeekly
      }],
      chart: {
        type: 'area',
        height: 150,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'solid',
        opacity: 1
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.colorsThemeBase]
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
            return `${val}`;
          }
        }
      },
      colors: [this.colorsThemeLight],
      markers: {
        colors: [this.colorsThemeLight],
        strokeColor: [this.colorsThemeBase],
        strokeWidth: 3
      }
    };
  }

  getChartOptionsByVendorsMonthly() {
    return {
      series: [{
        name: 'Vendors',
        data: this.seriesVendorsByMonthly
      }],
      chart: {
        type: 'area',
        height: 150,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'solid',
        opacity: 1
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.colorsThemeBase]
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
            return `${val}`;
          }
        }
      },
      colors: [this.colorsThemeLight],
      markers: {
        colors: [this.colorsThemeLight],
        strokeColor: [this.colorsThemeBase],
        strokeWidth: 3
      }
    };
  
  }



  getPurchaseAmountByPerWeek(sellerId) {
    this.spinner.show();
    this.reportsService.getPurchaseValueByWeek(sellerId).subscribe(res => {

      this.purchaseAmountByWeek = res;
      let uniqueRecords = _.uniqBy(this.purchaseAmountByWeek, 'PurchaseOrderItemId');
      this.purchaseAmountByWeek = uniqueRecords;

      this.totalPurchaseAmount = this.calculatePurchaseAmountByWeek(this.purchaseAmountByWeek);


      this.emitterService.isPurchaseWeekLoaded.emit(true);
      this.spinner.hide();
      this.chartOptions = this.getChartOptions();
      
    }, err => {
      this.spinner.hide();
    });
  }

  getPurchaseAmountByVendors(sellerId) {
    this.spinner.show();
    this.reportsService.getPurchaseValueByWeekByVendor(sellerId).subscribe(res => {

      this.VendorsByWeekly = res;
      let uniqueRecords = _.uniqBy(this.VendorsByWeekly, 'PurchaseOrderItemId');
      let uniqueRecordsByVendors = _.uniqBy(uniqueRecords, 'VendorId');
      this.VendorsByWeekly = uniqueRecordsByVendors;

      this.totalVendorsByWeekly = this.VendorsByWeekly.length;

      this.seriesVendorsByWeekly = this.calculateVendorsByWeek(this.VendorsByWeekly);

      this.chartOptions = this.getChartOptionsByVendorsWeekly();
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  getPurchaseMonthDataByMonth() {
    this.spinner.show();
    this.reportsService.getPurchaseAmountByMonth(this.monthData).subscribe(res => {
     
      this.purchaseAmountByMonth = res;
      let uniqueRecords = _.uniqBy(this.purchaseAmountByMonth, 'PurchaseOrderItemId');
      this.purchaseAmountByMonth = uniqueRecords;

      this.totalPurchaseAmountByMonth = this.calculatePurchaseAmountByMonth(this.purchaseAmountByMonth);
      this.chartOptions = this.getChartOptionsByMonth();
    }, err => {
      this.spinner.hide();
    });
  }


  getPurchaseAmountByMonthByVendors() {
    this.spinner.show();

    this.reportsService.getPurchaseAmountByMonthPerVendor(this.monthData).subscribe(res => {

      this.VendorsByMonthly = res;
      let uniqueRecords = _.uniqBy(this.VendorsByMonthly, 'PurchaseOrderItemId');
      let uniqueRecordsByVendors = _.uniqBy(uniqueRecords, 'VendorId');
      this.VendorsByMonthly = uniqueRecordsByVendors;

      this.totalVendorsByMonthly = this.VendorsByMonthly.length;
      this.seriesVendorsByMonthly = this.calculateVendorsByMonth(this.totalVendorsByMonthly);
      this.chartOptions = this.getChartOptionsByVendorsMonthly();
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  calculatePurchaseAmountByWeek(arr) {
    let totalValue: number = 0;
    for (let i = 0; i < arr.length; i++) {
      totalValue += arr[i].FinalPrice;
      this.seriesPurchaseAmountPerWeek.push(totalValue.toString());
    }
    let tempseriesPurchaseAmountPerWeek = Array.from(new Set(this.seriesPurchaseAmountPerWeek));
    this.seriesPurchaseAmountPerWeek = tempseriesPurchaseAmountPerWeek;

    return totalValue;
  }


  calculatePurchaseAmountByMonth(arr) {
    let totalValue: number = 0;
    for (let i = 0; i < arr.length; i++) {
      totalValue += arr[i].FinalPrice;
      this.seriesPurchaseAmountByMonth.push(totalValue.toString());
    }
    let seriesPurchaseAmountByMonth = Array.from(new Set(this.seriesPurchaseAmountByMonth));
    this.seriesPurchaseAmountByMonth = seriesPurchaseAmountByMonth;

    return totalValue;
  }

  calculateVendorsByWeek(arr) {
    let totalVendorsArr: any = [];
    for (let i = 1; i <= arr.length; i++) {
      totalVendorsArr.push(i.toString());
    }
    return totalVendorsArr;
  }


  calculateVendorsByMonth(arr) {
    let totalVendorsArr: any = [];
    for (let i = 1; i <= arr; i++) {
      totalVendorsArr.push(i.toString());
    }
    return totalVendorsArr;
  }


  weekly() {

    this.isActiveMonth = 'weekly';

    if (this.isActiveMonth === 'weekly' && this.isActiveByVendor === 'byPurchaseValue') {
      this.chartOptions = this.getChartOptions();
      this.cdr.detectChanges();
    }

    if (this.isActiveMonth === 'weekly' && this.isActiveByVendor === 'byVendor') {
      this.chartOptions = this.getChartOptionsByVendorsWeekly();
      this.cdr.detectChanges();
    }

    if (this.isActiveMonth === 'monthly' && this.isActiveByVendor === 'byPurchaseValue') {
      this.chartOptions = this.getChartOptionsByMonth();
      this.cdr.detectChanges();
    }




  }

  monthly() {

    this.isActiveMonth = 'monthly';

    if (this.isActiveMonth === 'weekly' && this.isActiveByVendor === 'byPurchaseValue') {
      this.chartOptions = this.getChartOptions();
      this.cdr.detectChanges();
    }

    if (this.isActiveMonth === 'weekly' && this.isActiveByVendor === 'byVendor') {
      this.chartOptions = this.getChartOptionsByVendorsWeekly();
      this.cdr.detectChanges();
    }

    if (this.isActiveMonth === 'monthly' && this.isActiveByVendor === 'byPurchaseValue') {
      this.chartOptions = this.getChartOptionsByMonth();
      this.cdr.detectChanges();
    }


  }

  byVendors() {
    this.isActiveByVendor = 'byVendor';

    if (this.isActiveMonth === 'weekly' && this.isActiveByVendor === 'byPurchaseValue') {
      this.chartOptions = this.getChartOptions();
      this.cdr.detectChanges();
    }

    if (this.isActiveMonth === 'weekly' && this.isActiveByVendor === 'byVendor') {
      this.chartOptions = this.getChartOptionsByVendorsWeekly();
      this.cdr.detectChanges();
    }

    if (this.isActiveMonth === 'monthly' && this.isActiveByVendor === 'byPurchaseValue') {
      this.chartOptions = this.getChartOptionsByMonth();
      this.cdr.detectChanges();
    }

    if (this.isActiveMonth === 'monthly' && this.isActiveByVendor === 'byVendor') {
      this.chartOptions = this.getChartOptionsByVendorsMonthly();
      this.cdr.detectChanges();
    }

  }

  byPurchase() {
    this.isActiveByVendor = 'byPurchaseValue';

    if (this.isActiveMonth === 'weekly' && this.isActiveByVendor === 'byPurchaseValue') {
      this.chartOptions = this.getChartOptions();
      this.cdr.detectChanges();
    }

    if (this.isActiveMonth === 'weekly' && this.isActiveByVendor === 'byVendor') {
      this.chartOptions = this.getChartOptionsByVendorsWeekly();
      this.cdr.detectChanges();
    }

    if (this.isActiveMonth === 'monthly' && this.isActiveByVendor === 'byPurchaseValue') {
      this.chartOptions = this.getChartOptionsByMonth();
      this.cdr.detectChanges();
    }

    if (this.isActiveMonth === 'monthly' && this.isActiveByVendor === 'byVendor') {
      this.chartOptions = this.getChartOptionsByVendorsMonthly();
      this.cdr.detectChanges();
    }

  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {

  }
}
