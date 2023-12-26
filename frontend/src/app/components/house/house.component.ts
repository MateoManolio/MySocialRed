import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmDiagComponent } from './confirm-diag/confirm-diag.component';
import { ChangeDetails } from './change-details/change-details.component';

@Component({
  selector: 'app-house',
  standalone: true,
  imports: [],
  templateUrl: './house.component.html',
  styleUrl: './house.component.css'
})

export class HouseComponent implements OnInit {
  overlayActive = false;
  noticias: any[] = [];
  totalNoticias: any[] = [];
  currentIndex: number = 0;

  constructor (
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private dialog: MatDialog,
  ) {};


  ngOnInit() {
    this.loadDefaultCards();
    this.authService.getNewsByStudy(this.study).subscribe(
      (noticias: any[]) => {
        this.totalNoticias = noticias;
        noticias = noticias.slice(0, 7); //Iba a hacer para cargar mas noticias
        for (let i = 0; i < this.noticias.length && i < noticias.length; i++) {
          this.noticias[i] = noticias[i] || {}; // Agrega la nueva noticia o un objeto vacío si no hay más
        }
      },
      (error) => {
        console.error('Error al obtener noticias', error);
      }
    );
  }

  get study() : string { return sessionStorage.getItem('study') || '' };
  get username() : string { return sessionStorage.getItem('username') || '' };
  get name() : string { return sessionStorage.getItem('name') || '' }; //No existe un metodo capitalize
  get surname() : string { return sessionStorage.getItem('surname') || '' };
  get profession() : string { return sessionStorage.getItem('profession') || '' };

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

  changeDetails() : void {
    const dialogRef = this.dialog.open(ChangeDetails, {
      data: {
        username: this.username,
        name: this.name,
        surname: this.surname,
        profession: this.profession,
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        sessionStorage.setItem('name', result.name);
        sessionStorage.setItem('surname', result.surname);
        sessionStorage.setItem('profession', result.profession);
        
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

  private loadDefaultCards(): void {
    for (let i = 0; i < 7; i++) {
      this.noticias.push({
        study: "",
        title: "No hay nada nuevo",
        description: "Es una noticia vacia.",
        date: "",
        user: "",
        url: "",
        urlToImage: "",
        starts: ""
      });
    }
  }

  currentNewsIndex = 0;

  handleScroll(event: WheelEvent): void {
    const scrollDirection = event.deltaY > 0 ? 'down' : 'up';
  
    if (scrollDirection === 'down' && this.currentNewsIndex < this.noticias.length - 1) {
      this.currentNewsIndex++;
    } else if (scrollDirection === 'up' && this.currentNewsIndex > 0) {
      this.currentNewsIndex--;
    } else if (scrollDirection === 'down' && this.currentNewsIndex === this.noticias.length - 1) {
      // Si llega a la última noticia, vuelve a la primera
      this.currentNewsIndex = 0;
    }
  }

}
    


