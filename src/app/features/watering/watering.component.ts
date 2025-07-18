import { CommonModule } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Calendar, CalendarSync, Info, LucideAngularModule, X } from "lucide-angular";
import { Component, computed, inject } from "@angular/core";
import { CalendarComponent } from "../../shared/calendar/calendar.component";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DialogConfirmationValidateComponent } from "../../shared/dialog/dialog-confirmation-validate/dialog-confirmation-validate.component";
import { PlantService } from "../../services/plant.service";
import { mergeMap, Subject, takeUntil, tap } from "rxjs";
import { DayAgoPipe } from "../../shared/pipes/day-ago.pipe";

@Component({
    selector: 'app-watering',
    standalone: true,
    imports: [CommonModule, MatDialogModule, LucideAngularModule, CalendarComponent, DayAgoPipe],
    templateUrl: './watering.component.html',
    styleUrl: './watering.component.css'
})
export class WateringComponent {

  private readonly dialog = inject(MatDialog);

  protected readonly X = X;
  protected readonly Calendar = Calendar;
  protected readonly CalendarSync = CalendarSync;
  protected readonly Info = Info;

  private destroy$ = new Subject<void>();

  dateSelected = computed(() => this.plantService.wateringDate() ?? null);

  plantId: number | undefined;
  mesDatesSpeciales = [new Date(2025, 6, 10), new Date(2025, 8, 15)];
  
  constructor(private location: Location, private activatedRoute: ActivatedRoute, protected plantService: PlantService) {}

  ngOnInit(): void {
    this.plantId = +this.activatedRoute.snapshot.paramMap.get('id')!;
  
    if(!this.plantService.selectedPlant()) {
      this.plantService.getPlantById(this.plantId).pipe(
          takeUntil(this.destroy$),
          tap(plant => this.plantService.setSelectedPlantId(plant.id)),
        ).subscribe()

        this.plantService.getWateringPlant(1, 3).pipe(tap((data) => console.log(data))).subscribe()
    }
  }

  goBack() {
      this.location.back();
  }

  openWaterPlantDialog() {
      const dialogRef = this.dialog.open(DialogConfirmationValidateComponent  , {
        width: '500px',
        data: {
          date: new Date(2024, 2, 28)
        }
      });

      const userId = 1;
      const houseId = 1;
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.plantService.getAssociationPlantToHouse(this.plantId!, houseId)
          .pipe(
            takeUntil(this.destroy$),
            mergeMap((res) => this.plantService.wateringPlant(userId, res.id, this.plantService.wateringDate()!))
          )
        .subscribe()
        }
      });
    }
}