import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit, OnDestroy{

  @Input() formConfig: MyFormConfig;
  @Input() model: any = {};
  @Output() formCompiledEvent = new EventEmitter<any>();

  constructor(private data: DataService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.data.changeModelValue({id: undefined})
  }

  submit(): void {
    this.formCompiledEvent.emit(this.model)
    this.model = {}
  }



}

export class MyFormConfig{
  idData:{camp: string, label: string }[]

}
