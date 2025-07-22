import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PlantCardComponent } from './features/plant/plant-card/plant-card.component';
import { WateringComponent } from './features/watering/watering.component';
import { userGuard } from './guards/user.guard';
import { SelectUserComponent } from './features/user/select-user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'choose-profile',
    component: SelectUserComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [userGuard],
  },
  {
    path: ':id',
    component: PlantCardComponent,
    canActivate: [userGuard],
  },
  {
    path: 'watering/:id',
    component: WateringComponent,
    canActivate: [userGuard],
  },
];
