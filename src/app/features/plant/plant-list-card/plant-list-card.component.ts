import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BadgeStatus } from "../../../shared/badge/badge-status/badge-status.component";
import { EllipsisVertical, Eye, LucideAngularModule } from "lucide-angular";
import { PlantCardTemperatureComponent } from "../plant-card-temperature/plant-card-temperature.component";
import { PlantCardExpositionComponent } from "../plant-card-light/plant-card-exposition.component";
import { PlantCardHumidityComponent } from "../plant-card-humidity/plant-card-humidity.component";
import { NgbDropdownMenu, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { BadgeDifficultyComponent } from "../../../shared/badge/badge-difficulty/badge-difficulty.component";
import { MenuItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-plant-list-card',
    standalone: true,
    imports: [CommonModule, BadgeStatus, LucideAngularModule, 
        PlantCardTemperatureComponent, PlantCardExpositionComponent, PlantCardHumidityComponent, NgbDropdownModule,
        BadgeDifficultyComponent, ButtonModule, MenuModule
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
    protected readonly Eye = Eye;

    toggleMenu(menu: any, event: MouseEvent): void {
      event.stopPropagation();

      menu.toggle(event);
    }

    menuItems: MenuItem[] = [
    {
      label: 'Voir la plante',
      icon: 'pi pi-eye',
      command: () => this.voirPlante()
    },
    {
      label: 'Arroser la plante',
      icon: 'pi pi-refresh',
      command: () => this.arroserPlante()
    },
    {
      separator: true
    },
    {
      label: 'Supprimer la plante',
      icon: 'pi pi-trash',
      command: () => this.supprimerPlante()
    }
  ];

  voirPlante() {
    // Ton action ici
  }

  arroserPlante() {
    // Ton action ici
  }

  supprimerPlante() {
    // Ton action ici
  }

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