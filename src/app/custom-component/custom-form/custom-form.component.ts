import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit {

  inputType = 'text';
  formCamp = ['name','surname','birthday']
  customForm;
  constructor() { }

  ngOnInit(): void {
  }

  add(values: any[]): void {
    console.log(values)
  }

}
