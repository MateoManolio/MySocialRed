import { Routes } from '@angular/router';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';

export const routes: Routes = [
    { path : 'register', component: RegisterComponent },
    { path : 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
