import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Color } from 'ng2-charts';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges{

  @Input()
  selectedKpi: any;

  @Input()
  startDate!: NgbDate;

  @Input()
  endDate!: NgbDate;

  @Input()
  selectedService: any;

  @Input()
  chartData: any;

  monthList = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

  constructor() { }
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{
      ticks: {
        fontColor: "white",
        fontSize: 10,
        // stepSize: 1,
        //  beginAtZero: true
    }
      
    }], yAxes: [{
      ticks: {
        fontColor: "white",
        fontSize: 10,
        // stepSize: 1,
         beginAtZero: true,
        callback: function(value, index, ticks) {
          return (Number(value)/1000).toFixed(1) + 'k';
        }
    }
    }] },
    events:[],
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        color:'white',
        font: {
          size: 10,
        },
        formatter: function(value, context) {
           return (value/1000).toFixed(1) + 'k';
        }
      }
    }
  };
  public barChartColors: Color[] = [
    { backgroundColor: 'blue' },
  ]
  public barChartLabels: Label[] = [];
  
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [] },
  ];

  ngOnInit(): void {
    this.getData();

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getData(); 
  }

  getData() {
    this.barChartLabels = [];
    this.barChartData[0].data = [];
    this.chartData = this.chartData.sort((a: any, b: any) => parseFloat(a.month) - parseFloat(b.month));

    const startDate = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day);  
    const endDate = new Date(this.endDate.year, this.endDate.month - 1, this.endDate.day);

    const chartList = this.chartData.filter((item:any) => item.serviceName === this.selectedService && new Date(item.dateFrom) >= startDate && new Date(item.dateTo) <= endDate);
    for (let i = 0; i < chartList.length; i++) {
      
      const month = chartList[i].month.split(/(\d{4})(\d{2})/); //Returns array in the format ["", "2022", "06", ""]
      this.barChartLabels.push(this.monthList[parseInt(month[2]) - 1]);
      this.barChartData[0].data?.push(chartList[i][this.selectedKpi]);
      
    }
  }



}
