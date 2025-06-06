import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BadgeStatus } from "../../../shared/badge/badge-status/badge-status.component";
import { EllipsisVertical, LucideAngularModule } from "lucide-angular";
import { PlantCardTemperatureComponent } from "../plant-card-temperature/plant-card-temperature.component";
import { PlantCardExpositionComponent } from "../plant-card-light/plant-card-exposition.component";
import { PlantCardHumidityComponent } from "../plant-card-humidity/plant-card-humidity.component";
import { NgbDropdownMenu, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { BadgeDifficultyComponent } from "../../../shared/badge/badge-difficulty/badge-difficulty.component";

@Component({
    selector: 'app-plant-list-card',
    standalone: true,
    imports: [CommonModule, BadgeStatus, LucideAngularModule, 
        PlantCardTemperatureComponent, PlantCardExpositionComponent, PlantCardHumidityComponent, NgbDropdownModule,
        BadgeDifficultyComponent
    ],
    templateUrl: './plant-list-card.component.html',
    styleUrl: './plant-list-card.component.css'
})
export class PlantListCardComponent{
    @Input() temperature: number = 0;
    @Input() exposition: number = 0;
    @Input() humidity: number = 0;

    etat: string = 'Hydraté';

    title: string = 'Monstera';

    protected readonly EllipsisVertical = EllipsisVertical;

    getImagePath(): string {
    switch (this.title.toLowerCase()) {
      case 'monstera':
        return 'assets/monstera.png';
      case 'orchide':
        return 'assets/orchidee.png';
      case 'cactus':
        return 'assets/cactus.png';
      // Ajoute d'autres cas selon tes besoins
      default:
        return 'assets/default.png'; // fallback
    }
  }
}