import { Component, inject, Input } from "@angular/core";
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
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { DialogConfirmationDeleteComponent } from "../../../shared/dialog/dialog-confirmation-delete/dialog-confirmation-delete.component";
import { Router } from "@angular/router";
import { DialogConfirmationValidateComponent } from "../../../shared/dialog/dialog-confirmation-validate/dialog-confirmation-validate.component";

@Component({
    selector: 'app-plant-list-card',
    standalone: true,
    imports: [CommonModule, BadgeStatus, LucideAngularModule, 
        PlantCardTemperatureComponent, PlantCardExpositionComponent, PlantCardHumidityComponent, NgbDropdownModule,
        BadgeDifficultyComponent, ButtonModule, MenuModule, MatDialogModule
    ],
    templateUrl: './plant-list-card.component.html',
    styleUrl: './plant-list-card.component.css'
})
export class PlantListCardComponent{
  constructor(protected router: Router) {}
  
  readonly dialog = inject(MatDialog);

    @Input() temperature: number = 0;
    @Input() exposition: number = 0;
    @Input() humidity: number = 0;
    @Input() plantId: number = 0;

    etat: string = 'Hydraté';

    title: string = 'Monstera';
    

    protected readonly EllipsisVertical = EllipsisVertical;
    protected readonly Eye = Eye;

    menuItems: MenuItem[] = [
      {
        label: 'Voir la plante',
        icon: 'pi pi-eye',
        command: () => this.goToPlant(this.plantId)
      },
      {
        label: 'Arroser la plante',
        icon: 'pi pi-refresh',
        command: () => this.arroserPlante(this.plantId)
      },
      {
        separator: true
      },
      {
        label: 'Supprimer la plante',
        icon: 'pi pi-trash',
        command: () => this.deletePlant(this.plantId)
      }
    ];

    toggleMenu(menu: any, event: MouseEvent): void {
      event.stopPropagation();

      menu.toggle(event);
    }

    

  goToPlant(id: number) {
    this.router.navigate([`/${id}`])
  }

  arroserPlante(id: number) {
    const dialogRef = this.dialog.open(DialogConfirmationValidateComponent, {
      width: '500px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) console.log('plante arrosé')
    })
  }

  deletePlant(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmationDeleteComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) console.log(id + " Plante supprimé");//this.consultationService.deleteConsultationById(id).subscribe();
    });
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