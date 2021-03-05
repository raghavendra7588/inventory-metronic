import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { LayoutService } from '../../../../../core';

@Component({
  selector: 'app-stats-widget10',
  templateUrl: './stats-widget10.component.html',
})
export class StatsWidget10Component implements OnInit {
  @Input() cssClass;
  @Input() symbolShape;
  @Input() baseColor;
  chartOptions: any = {};
  fontFamily = '';
  colorsGrayGray500 = '';
  colorsGrayGray200 = '';
  colorsGrayGray300 = '';
  colorsThemeBase = '';
  colorsThemeLight = '';
  symbolCSSClasses = '';
  svgCSSClasses = '';

  strUserId: string;
  salesData: any = [];

  weeklySales: string;
  monthlySales: string;
  yearlySales: string;
  dailySales: string;

  currentTab: string;
  currentTabSales: string = 'Sales';

  dailySalesSeries: any = [];
  weeklySalesSeries: any = [];
  monthlySalesSeries: any = [];
  yearlySalesSeries: any = [];

  constructor(
    private layout: LayoutService,
    private reportsService: ReportsService,
    private spinner: NgxSpinnerService) { }

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
    this.strUserId = sessionStorage.getItem('sellerId');
    if (!this.baseColor) {
      this.baseColor = 'success';
    }

    if (!this.symbolShape) {
      this.symbolShape = 'symbol-circle';
    }
    this.loadLayoutView();
    this.symbolCSSClasses = `symbol ${this.symbolShape} symbol-50 symbol-light-${this.baseColor} mr-2`;
    this.svgCSSClasses = `svg-icon svg-icon-xl svg-icon-${this.baseColor}`;

    this.currentTab = 'Daily'
    this.getDashBoardSalesRelatedData();
    this.chartOptions = this.getChartOptionsDaily();
  }

  getChartOptionsDaily() {
    return {
      series: [{
        name: 'Daily Sales',
        data: this.dailySalesSeries
      }],
      chart: {
        type: 'area',
        height: '150px',
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
            return `$ ${val} Rs`;
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

  getChartOptionsWeekly() {
    return {
      series: [{
        name: 'Weekly Sales',
        data: this.weeklySalesSeries
      }],
      chart: {
        type: 'area',
        height: '150px',
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
            return `$ ${val} Rs`;
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

  getChartOptionsMonthly() {
    return {
      series: [{
        name: 'Monthly Sales',
        data: this.monthlySalesSeries
      }],
      chart: {
        type: 'area',
        height: '150px',
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
            return `$ ${val} Rs`;
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

  getChartOptionsYearly() {
    return {
      series: [{
        name: 'Yearly Sales',
        data: this.yearlySalesSeries
      }],
      chart: {
        type: 'area',
        height: '150px',
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
            return `$ ${val} Rs`;
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




  getDashBoardSalesRelatedData() {
    this.spinner.show();
    this.reportsService.getDashBoardSales(this.strUserId).subscribe(res => {
      this.salesData = res;
      console.log('sales data', res[1]);

      this.dailySales = this.salesData[1].Totall;
      this.weeklySales = this.salesData[1].Week;
      this.monthlySales = this.salesData[1].Month;
      this.yearlySales = this.salesData[1].Year;

      console.log('this.weeklySales', this.weeklySales);
      console.log('this.monthlySales', this.monthlySales);
      console.log('this.yearlySales', this.yearlySales);
      console.log('this.totalSales', this.dailySales);

      this.dailySeriesData(this.dailySales);
      this.weeklySeriesData(this.weeklySales);
      this.monthlySeriesData(this.monthlySales);
      this.yearlySeriesData(this.yearlySales);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  dailySalesData() {
    this.currentTab = 'Daily';
    this.chartOptions = this.getChartOptionsDaily();
  }

  weeklySalesData() {
    this.currentTab = 'Weekly';
    this.chartOptions = this.getChartOptionsWeekly();
  }

  monthlySalesData() {
    this.currentTab = 'Monthly';
    this.chartOptions = this.getChartOptionsMonthly();
  }

  yearlySalesData() {
    this.currentTab = 'Yearly';
    this.chartOptions = this.getChartOptionsYearly();
  }

  dailySeriesData(dailyRes) {
    //console.log('dailySales', dailyRes);
    for (let i = 0; i < Number(dailyRes); i++) {
      this.dailySalesSeries.push(i.toString());
    }
  
    this.chartOptions = this.getChartOptionsDaily();
  }

  weeklySeriesData(weeklyRes) {
   // console.log('Weekly', weeklyRes);
    for (let i = 0; i < Number(weeklyRes); i++) {
      this.weeklySalesSeries.push(i.toString());
    }
    console.log('this.weeklySalesSeries', this.weeklySalesSeries);
    this.chartOptions = this.getChartOptionsWeekly();
  }

  monthlySeriesData(monthlyRes) {
    //console.log('Monthly', monthlyRes);
    for (let i = 0; i < Number(monthlyRes); i++) {
      this.monthlySalesSeries.push(i.toString());
    }
    console.log('this.monthlySalesSeries', this.monthlySalesSeries);
    this.chartOptions = this.getChartOptionsMonthly();
  }

  yearlySeriesData(yearlyRes) {
  //  console.log('Yearly', yearlyRes);
    for (let i = 0; i < Number(yearlyRes); i++) {
      this.yearlySalesSeries.push(i.toString());
    }
    console.log('this.yearlySalesSeries', this.yearlySalesSeries);
    this.chartOptions = this.getChartOptionsYearly();
  }

}
