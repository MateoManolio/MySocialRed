import { Routes } from '@angular/router';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HouseComponent } from './components/house/house.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path : 'register', component: RegisterComponent },
    { path : 'login', component: LoginComponent },
    { path : 'home', component: HomeComponent },
    { path : 'house', component: HouseComponent, canActivate : [authGuard] },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
