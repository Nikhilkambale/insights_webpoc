import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';  
  
@Component({  
  selector: 'app-dropdown',  
  templateUrl: './dropdown.component.html',  
  styleUrls: ['./dropdown.component.scss']  
})  
export class DropdownComponent implements OnInit, OnChanges {  
  
  @Input()  
  data: any;  
    
  @Input()  
  defaultSelectedOption: any;
  
  @Output()  
  selectedOption = new EventEmitter<any>();  
  
  constructor() { }  
  
  ngOnInit(): void {  
    // Set the selectedOptionTitle to the defaultSelectedOption when the component is initialized  
    this.selectedOptionTitle = this.defaultSelectedOption;  
  }  
  
  ngOnChanges(changes: SimpleChanges): void {    
    if (changes['defaultSelectedOption'] && changes['defaultSelectedOption'].currentValue !== changes['defaultSelectedOption'].previousValue){    
      this.selectedOptionTitle = changes['defaultSelectedOption'].currentValue;    
    }    
  }  
  
  arrow='assets/arrow-down-icon.png'  
  selectedOptionTitle:any;  


  selectOption(item: string) {   
    console.log('Selected option:', item);  
    this.selectedOption.emit(item);  
    this.selectedOptionTitle = item;  
  }  
  
}