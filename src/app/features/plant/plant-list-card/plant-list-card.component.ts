import { Component, inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BadgeStatus } from "../../../shared/badge/badge-status/badge-status.component";
import { Droplet, EllipsisVertical, Eye, LucideAngularModule, Trash } from "lucide-angular";
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
import { UtilsService } from "../../../services/utils.service";

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
    protected readonly Droplet = Droplet;
    protected readonly Trash = Trash;

    menuItems: MenuItem[] = [
      {
        label: 'Voir la plante',
        command: () => this.goToPlant(this.id)
      },
      {
        label: 'Arroser la plante',
        command: () => this.arroserPlante(this.id)
      },
      {
        separator: true
      },
      {
        label: 'Supprimer la plante',
        command: () => this.deletePlant(this.id)
      }
    ];

  constructor(protected router: Router, protected plantService: PlantService, protected utilsService: UtilsService) {
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
}