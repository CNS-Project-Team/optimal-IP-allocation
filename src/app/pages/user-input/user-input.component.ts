import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  @Input() ipCount!: AbstractControl<any, any>;

  ipCountNew = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    userCount: new FormControl(''),
  });
  

  ngOnInit() {
    this.ipCountNew = this.ipCount as FormGroup;
  }
}
