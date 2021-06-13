import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {

  @Input() buttonConfig: MyButtonConfig;
  @Output() clickButton = new EventEmitter<any[]>();

  constructor() { }

  clickedButton(value:any){
    this.clickButton.emit(value)
  }
  ngOnInit() {
  }

}
export class MyButtonConfig {
  customCssClass: string ;
  text: string ;
  icon: string;
}
