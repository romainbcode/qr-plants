import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PlantCardComponent } from './features/plant/plant-card/plant-card.component';
import { WateringComponent } from './features/watering/watering.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
       path: ':id',
       component: PlantCardComponent
    },
    {
        path: 'watering/:id',
        component: WateringComponent    
    }
];
