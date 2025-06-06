import { Component, inject } from "@angular/core";
import {
  MatDialog,
  MatDialogModule,
  
} from '@angular/material/dialog';
import { PlantFormComponent } from "../plant/plant-form/plant-form.component";
import { PlantListCardComponent } from "../plant/plant-list-card/plant-list-card.component";
import { PlantButtonAddComponent } from "../plant/plant-button-add/plant-button-add.component";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MatDialogModule, PlantListCardComponent, PlantButtonAddComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);

  plants = [
    {
      temperature: 22,
      exposition: 65,
      humidity: 60
    },
    {
      temperature: 18,
      exposition: 50,
      humidity: 70
    },
    {
      temperature: 25,
      exposition: 40,
      humidity: 80
    },
    {
      temperature: 22,
      exposition: 80,
      humidity: 60
    },
    {
      temperature: 18,
      exposition: 50,
      humidity: 70
    },
    {
      temperature: 25,
      exposition: 40,
      humidity: 80
    }
  ];

  constructor(private router: Router) {}

  openGenerateQRCode(): void {
    this.dialog.open(PlantFormComponent, {
      width: '500px',
    })
  }

  goToPlant(id: number): void {
    this.router.navigate([`/$id`])
  }
}