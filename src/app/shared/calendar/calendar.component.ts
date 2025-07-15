import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { PrimeNGConfig } from 'primeng/api';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  @Output() dateSelected = new EventEmitter<Date>();
  @Input() date2: Date | undefined;

  date: Date | null = null;

  firstDayOfWeek: number = 1;


  constructor(private primengConfig: PrimeNGConfig, protected plantService: PlantService) {}

  ngOnInit() {
    if(this.date2) {
      console.log("test");
      this.plantService.setWateringDate(this.date2);
      this.date = this.date2;
    }
    this.primengConfig.setTranslation({
      firstDayOfWeek: 1,
      dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
      dayNamesShort: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
      dayNamesMin: ["D","L","M","M","J","V","S"],
      monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
      monthNamesShort: ["janv", "févr", "mars", "avr", "mai", "juin", "juil", "août", "sept", "oct", "nov", "déc"],
      today: 'Aujourd\'hui',
      clear: 'Effacer',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sm'
    });
  }

  onDateSelect(event: any) {
    if (event) {
      console.log("test2");
      this.plantService.setWateringDate(event);
      this.dateSelected.emit(event);
    }
  }
}
