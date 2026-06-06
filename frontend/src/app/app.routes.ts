import { Routes } from '@angular/router';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';
import { PlantFormComponent } from './components/plant-form/plant-form.component';

export const routes: Routes = [
  { path: '', component: PlantListComponent },
  { path: 'plants/:id', component: PlantDetailComponent },
  { path: 'add-plant', component: PlantFormComponent },
  { path: '**', redirectTo: '' }
];
