import { Component, Input } from '@angular/core';
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
  @Input() date2: Date | null = null;
  @Input() dateWatered : Date[] = [];

  date: Date | null = null;

  firstDayOfWeek: number = 1;

  dateSelected: Date | null = null;

  constructor(private primengConfig: PrimeNGConfig, protected plantService: PlantService) {}

  ngOnInit() {
    if(this.date2) {
      this.plantService.setWateringDate(this.date2);
      this.dateSelected = this.date2;
    }
    this.primengConfig.setTranslation({
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
      this.plantService.setWateringDate(event);
    }
  }

  protected isToday(date: any): boolean {
    const today = new Date();
    return (
      date.day === today.getDate() &&
      date.month === today.getMonth() &&
      date.year === today.getFullYear()
    );
  }

  protected isAlreadyWatered(date: any): boolean {
    return this.dateWatered.some(
      d => d.getDate() === date.day &&
           d.getMonth() === date.month &&
           d.getFullYear() === date.year
    );
  }

  protected isSelected(date: any): boolean {
    if (!this.dateSelected) return false;

    return (
      this.dateSelected.getDate() === date.day &&
      this.dateSelected.getMonth() === date.month &&
      this.dateSelected.getFullYear() === date.year
    );
  }
}
