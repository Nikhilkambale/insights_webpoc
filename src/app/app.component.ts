import { Component, OnInit } from '@angular/core';  
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';  
import { DataServiceService } from './services/data-services.service';  
  
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.scss']  
})  
export class AppComponent implements OnInit { 
  title = 'univision';
  data: any;
  chartData: any;
  cluster: any = [];
  services: any = [];
  kpi: any = [];
  keyInsigts: any = [];
  selectedKeyInsight: any;
  filteredKpi: any = [];
  selectedCluster: string = '';
  filteredService: any = []; 
  selectedService: string = '';
  selectedKpi: string = '';
  startDate!: NgbDate;
  endDate!: NgbDate;
  name:string = '';
  review:string = '';

  constructor(private dataService: DataServiceService) {
  }
  
  dropdown='assets/'
  datepicker='assets/datepicker.svg'

  ngOnInit(): void {  
    this.fetchData();  
    const currentDate = new Date();  
    const threeMonthsAgo = new Date(  
        currentDate.getFullYear(),  
        currentDate.getMonth() - 9,  
        currentDate.getDate()  
    );  
    this.startDate = new NgbDate(  
        threeMonthsAgo.getFullYear(),  
        threeMonthsAgo.getMonth(),  
        1  
    );  
    this.endDate = new NgbDate(  
        currentDate.getFullYear(),  
        currentDate.getMonth() + 1,  
        1  
    );  
  
    // Set initial values for selectedCluster, selectedService, and selectedKpi  
    // setTimeout(() => {  
    //     this.updateSelectedCluster(this.cluster[0]);  
    // }, 10000);  
}  


  onStartDateChange(date: Date) {  
    const year = date.getFullYear();  
    const month = date.getMonth() + 1;  
    
    // If month value is 13, increment the year and set month to 1  
    if (month < 4) {  
      this.startDate = new NgbDate(year - 1, month + 9, 1);  
    } else {  
      this.startDate = new NgbDate(year, month - 2, 1);  
    }  
    
    this.updateSelections();  
  }  
    
  onEndDateChange(date: Date) {  
    const year = date.getFullYear();  
    const month = date.getMonth() + 1;  
    
    // If month value is 13, increment the year and set month to 1  
    if (month > 9) {  
      this.endDate = new NgbDate(year + 1, month - 9, 1);  
    } else {  
      this.endDate = new NgbDate(year, month + 4, 1);  
    }  
    
    this.updateSelections();  
  }  
  
  

  onClickSubmit(receivedData: any) {
    this.name = receivedData.name;
    this.review = receivedData.review;
    let dataToSubmit = {
      service: this.selectedService,
      kpi: this.selectedKpi,
      insight: this.selectedKeyInsight,
      name: this.name,
      review: this.review
    }
    this.submitData(dataToSubmit);
  }

  submitData(value: any) {
    let body = {
      service: value.service,
      kpi: value.kpi,
      insight: value.insight,
      name: value.name,
      review: value.review
    }
    this.dataService.postData(body)
      .subscribe(response => {
        console.log(response)
      })
  }

  fetchData() {  
    this.dataService.getData().subscribe(  
      (data: any) => {  
        this.data = data;  
        this.getFilterOptions();  
        this.updateSelectedService(this.services[0]);  
        this.updateSelections();  
      },  
      (error: any) => {  
          
      }  
    )  
    this.dataService.getTrendChartData().subscribe(  
      (data: any) => {  
        this.chartData = data;  
      },  
      (error: any) => {  
          
      }  
    )  
  }  
  

  updateSelections() {  
    console.log('Updating selections with service:', this.selectedService, 'and KPI:', this.selectedKpi);  
    
    const startDate = new Date(this.startDate.year, this.startDate.month, this.startDate.day);  
    const endDate = new Date(this.endDate.year, this.endDate.month, this.endDate.day);  
    
    console.log('Updating selections with startDate:', this.startDate, 'and endDate:', this.endDate);  
    
    this.keyInsigts = this.data.filter((item: any) => item.serviceName === this.selectedService && item.kpi === this.selectedKpi  
      && item.cluster === this.selectedCluster  
      && new Date(item.dateFrom).getTime() >= startDate.getTime() && new Date(item.dateTo).getTime() <= endDate.getTime());  
    this.selectKeyInsight(0);  
  }  
  

  getFilterOptions() {  
    for (let i = 0; i < this.data.length; i++) {  
        if (!this.cluster.includes(this.data[i].cluster)) {  
            this.cluster.push(this.data[i].cluster);  
        }  
          
        if (!this.services.includes(this.data[i].serviceName)) {  
            this.services.push(this.data[i].serviceName);  
            this.kpi[this.data[i].serviceName] = [];  
            this.cluster[this.data[i].serviceName] = [];  
  
            for (let j = 0; j < this.data.length; j++) {  
                if (this.data[i].serviceName === this.data[j].serviceName) {  
                    if (!this.kpi[this.data[i].serviceName].includes(this.data[j].kpi)) {  
                        this.kpi[this.data[i].serviceName].push(this.data[j].kpi);  
                    }  
                    if (!this.cluster[this.data[i].serviceName].includes(this.data[j].cluster)) {  
                        this.cluster[this.data[i].serviceName].push(this.data[j].cluster);  
                    }  
                }  
            }  
        }  
    }  
  
    // Set initial values for selectedCluster, selectedService, and selectedKpi  
    this.updateSelectedCluster(this.cluster[0]);  
}  


  updateSelectedCluster(data: any) {  
    console.log('Received selected cluster:', data);  
    this.selectedCluster = data;  
    this.filteredService = this.services.filter((service: any) => {  
        for (let item of this.data) {  
            if (item.serviceName === service && item.cluster === this.selectedCluster) {  
                return true;  
            }  
        }  
        return false;  
    });  
  
    this.selectedService = this.filteredService[0];  
    this.updateSelectedService(this.filteredService[0]);  
    this.filteredKpi = this.kpi[this.selectedService];  
    this.selectedKpi = this.kpi[this.selectedService][0];  
    this.updateSelectedKpi(this.kpi[this.selectedService][0]);  
}  



  updateSelectedService(data: any) {  
    console.log('Received selected service:', data);  
    this.selectedService = data;  
    this.filteredKpi = this.kpi[this.selectedService];  
    this.selectedKpi = this.kpi[this.selectedService][0]; 
    this.updateSelectedKpi(this.kpi[this.selectedService][0]);  
  }  
    
  
    
  updateSelectedKpi(data: any) {  
    console.log('Received selected KPI:', data);  
    this.selectedKpi = data;  
    this.updateSelections()  
  }

  selectKeyInsight(index: number) {
    this.selectedKeyInsight = this.keyInsigts[index];
  }

}
