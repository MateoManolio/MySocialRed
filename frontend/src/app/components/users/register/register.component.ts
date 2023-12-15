import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formulario: FormGroup;

  constructor () {
    this.formulario = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      
    })
  }

}
