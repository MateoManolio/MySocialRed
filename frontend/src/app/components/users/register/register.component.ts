import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/auth';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(/^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/)]],
    psw: ['', Validators.required],
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]],
    surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]],
    study: ['', Validators.required],
    profession: ['', Validators.required]
  });

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    ){}
  
  get username(){return this.registerForm.controls['username']}

  get psw(){return this.registerForm.controls['psw']}

  get name(){return this.registerForm.controls['name']}

  get surname(){return this.registerForm.controls['surname']}

  get study(){return this.registerForm.controls['study']}

  get profession(){return this.registerForm.controls['profession']}


  submitDetails() {
    const postData = { ...this.registerForm.value };
  
    this.authService.registerUser(postData as User)
      .pipe(
        catchError(error => {
          // console.error(error);
          let errorMessage = 'Algo salió mal.';

          if (error.error instanceof ErrorEvent)  // Error del lado del cliente
            errorMessage = `Error: ${error.error.message}`;
          else // El backend devolvió un código de error
            errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
          
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
          throw error;
        })
      )
      .subscribe(
        response => {
          // console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro exitoso!' });
          this.router.navigate(['login']);
        }
      );
  }
}
