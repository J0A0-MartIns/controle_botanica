import { Routes } from '@angular/router';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';
import { PlantFormComponent } from './components/plant-form/plant-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: PlantListComponent, canActivate: [authGuard] },
  { path: 'plants/:id', component: PlantDetailComponent, canActivate: [authGuard] },
  { path: 'add-plant', component: PlantFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
