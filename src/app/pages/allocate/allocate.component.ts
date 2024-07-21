import { Component } from '@angular/core';
import { UserInputComponent } from "../user-input/user-input.component";
import { JsonPipe, NgFor } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface IpCount {
  id: number,
  name: string,
  userCount: number
}

@Component({
  selector: 'app-allocate',
  standalone: true,
  imports: [UserInputComponent,NgFor,FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './allocate.component.html',
  styleUrl: './allocate.component.css'
})
export class AllocateComponent {

  ipBaseObject = this.formBuilder.group({
    fieldCount: [''],
    ipCounts: this.formBuilder.array([]),
  });

  constructor(private formBuilder: FormBuilder) {}
 

  ngOnInit(){
    this.addNewLine();
  }

  addNewLine() { 
    this.ipCounts.push(new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      userCount: new FormControl(''),
    }))
  }

  get ipCounts() {
    return this.ipBaseObject.get('ipCounts') as FormArray;
  }

  save() {
    console.table(this.ipCounts.value);
  }

}
