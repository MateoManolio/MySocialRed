import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmDiagComponent } from './confirm-diag/confirm-diag.component';

@Component({
  selector: 'app-house',
  standalone: true,
  imports: [],
  templateUrl: './house.component.html',
  styleUrl: './house.component.css'
})

export class HouseComponent {
  study = sessionStorage.getItem('study');
  name = sessionStorage.getItem('name'); //No existe un metodo capitalize
  username = sessionStorage.getItem('username')
  overlayActive = false;


  constructor (
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private dialog: MatDialog,
  ) {};

  toggleOverlay() : void{
      this.overlayActive = !this.overlayActive;
  }

  logOut() : void{
    sessionStorage.clear();
    this.router.navigate(['home']);
  }

  deleteAccount(): void {
    const dialogRef = this.dialog.open(ConfirmDiagComponent, {
      data: { message: '¿Estás seguro de que deseas borrar tu cuenta?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performAccountDeletion();
        this.logOut();
      }
    });
  }

  private performAccountDeletion(): void {
    const username = this.username || '';
  
    this.authService.deleteUser(username)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Algo salió mal.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Código de error: ${error.status}, Mensaje: ${error.error.message}`;
        }

        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
        throw error;
      })
    )
    .subscribe((response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
    });
  }
}
    


