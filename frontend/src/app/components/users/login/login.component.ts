import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
      username: ['', Validators.required],
      psw: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    ){}

  get username(){
    return this.loginForm.controls['username'];
  }

  get psw(){
    return this.loginForm.controls['psw'];
  }


  loginUser() {
    const { username, psw } = this.loginForm.value;
  
    this.authService.getUserByUsername(username as string)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Algo salió mal.';
  
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
          }
  
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
          throw error;
        })
      )
      .subscribe((response: any) => {
        if (response.length === 0) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario no encontrado' });
        } else {
          const user = response[0];
          if (user.psw === psw) {
            sessionStorage.setItem('username', user.username);
            sessionStorage.setItem('study', user.study);
            sessionStorage.setItem('name', user.name);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logueado exitoso!' });
            this.router.navigate(['house']);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El DNI o contraseña no es correcto' });
          }
        }
      });
  }

}
