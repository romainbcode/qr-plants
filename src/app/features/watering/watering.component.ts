import { CommonModule } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Calendar, CalendarSync, Info, LucideAngularModule, X } from "lucide-angular";
import { PlantListCardComponent } from "../plant/plant-list-card/plant-list-card.component";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { CalendarComponent } from "../../shared/calendar/calendar.component";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DialogConfirmationValidateComponent } from "../../shared/dialog/dialog-confirmation-validate/dialog-confirmation-validate.component";
import { PlantService } from "../../services/plant.service";
import { Subject, takeUntil, tap } from "rxjs";
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

  dateSelected: Date | undefined;
  
  constructor(private location: Location, private activatedRoute: ActivatedRoute, protected plantService: PlantService) {}

  ngOnInit(): void {
    const plantId = +this.activatedRoute.snapshot.paramMap.get('id')!;
  
    if(!this.plantService.selectedPlant()) {
      this.plantService.getPlantById(plantId).pipe(
          takeUntil(this.destroy$),
          tap(plant => this.plantService.setSelectedPlantId(plant.id)),
        ).subscribe()


        this.plantService.getWateringPlant(1, 3).pipe(tap((data) => console.log(data))).subscribe()
    }
    if(this.activatedRoute.snapshot.queryParams['date']) {
      this.onDateSelected(new Date(this.activatedRoute.snapshot.queryParams['date']));
    }
  }

  onDateSelected(date: Date) {
    this.dateSelected = date;
  }

  onWatering() {
    console.log('Arroser');
  }

  goBack() {
      this.location.back();
  }

  openWaterPlantDialog() {
      //mettre une date en parametre
      const dialogRef = this.dialog.open(DialogConfirmationValidateComponent  , {
        width: '500px',
        data: {
          date: new Date(2024, 2, 28)
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) console.log( new Date(2024, 2, 28) + " Plante arrosé");
      });
    }
}