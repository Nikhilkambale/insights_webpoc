import { Component, OnInit, Output, EventEmitter } from '@angular/core';  
  
@Component({  
  selector: 'app-datepicker',  
  templateUrl: './datepicker.component.html',  
  styleUrls: ['./datepicker.component.scss']  
})  
export class DatepickerComponent implements OnInit {  
  @Output() dateChange = new EventEmitter<Date>();  
  formattedDate: string;  
  
  constructor() {  
    const currentDate = new Date();  
    this.formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;  
  }  
  
  ngOnInit(): void {}  
  
  onDateChange(event: any) {  
    const selectedDate = new Date(event.target.value);  
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);  
    this.dateChange.emit(firstDayOfMonth);  
  }  
} 