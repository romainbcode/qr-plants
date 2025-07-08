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
import { PlantService } from "../../../services/plant.service";
import { mergeMap, Subject, takeUntil } from "rxjs";

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
  private destroy$ = new Subject<void>();
  
  readonly dialog = inject(MatDialog);

    @Input() temperature: number = 0;
    @Input() exposition: number = 0;
    @Input() humidity: number = 0;
    @Input() name: string = '';
    @Input() particularity: string = '';
    @Input() difficulty: number = 0;
    @Input() id: number = 0;

    etat: string = 'Hydraté';

    protected readonly EllipsisVertical = EllipsisVertical;
    protected readonly Eye = Eye;

    menuItems: MenuItem[] = [
      {
        label: 'Voir la plante',
        icon: 'pi pi-eye',
        command: () => this.goToPlant(this.id)
      },
      {
        label: 'Arroser la plante',
        icon: 'pi pi-refresh',
        command: () => this.arroserPlante(this.id)
      },
      {
        separator: true
      },
      {
        label: 'Supprimer la plante',
        icon: 'pi pi-trash',
        command: () => this.deletePlant(this.id)
      }
    ];

  constructor(protected router: Router, protected plantService: PlantService) {
  }


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

    const userId = 1;
    const houseId = 1;

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.plantService.getAssociationPlantToHouse(this.id, houseId)
          .pipe(
            takeUntil(this.destroy$),
            mergeMap((res) => this.plantService.wateringPlant(userId, res.id, this.plantService.wateringDate()!))
          )
        .subscribe()
      }
    })
  }

  deletePlant(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmationDeleteComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.plantService.desassociatePlantToHouse(id, 1).subscribe();
    });
  }

  getImagePath(): string {
    switch (this.name.toLowerCase()) {
    case 'monstera':
        return 'assets/monstera.png';
    case 'orchide':
        return 'assets/orchidee.png';
    case 'araignee':
        return 'assets/plante-araignee.png';
    case 'pothos':
        return 'assets/pothos.png';
    case 'lemon':
        return 'assets/lemon.png';
    case 'avocado':
        return 'assets/avocado.png';
    default:
        return 'Image introuvable';
    }
}
}