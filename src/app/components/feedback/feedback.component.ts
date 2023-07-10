import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'feedback-block',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
  })
  export class FeedbackComponent implements OnInit, OnChanges {

    @Input()
    title: string = '';
  
    @Input()
    type: string = '';
  
    @Input()
    data: any;
  
    constructor() { }
  
    ngOnInit(): void {
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
    }
  
  }