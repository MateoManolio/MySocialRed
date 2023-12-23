import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { catchError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { User } from '../../../interfaces/auth';

@Component({
  selector: 'app-confirm-diag',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-details.component.html',
  styleUrl: './change-details.component.css'
})

export class ChangeDetails {
  userData: any = {}; // Objeto para almacenar datos de usuario
  changeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChangeDetails>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, 
    private authService: AuthService,
    private messageService: MessageService
  ) {

    this.changeForm = this.fb.group({
      username: [''],
      psw: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]],
      profession: ['', Validators.required]
    });

  }


  get psw(){
    return this.changeForm.controls['psw'];
  }


  get name(){
    return this.changeForm.controls['name'];
  }

  get surname(){
    return this.changeForm.controls['surname'];
  }

  get profession(){
    return this.changeForm.controls['profession'];
  }


  onSubmit(): void {
    const updateData = { ...this.changeForm.value };
    delete updateData.username;
  
    this.authService.updateUser(this.data.username, updateData as User)
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
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Actualizado exitoso!' });
        }
      );
    this.dialogRef.close(updateData);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}