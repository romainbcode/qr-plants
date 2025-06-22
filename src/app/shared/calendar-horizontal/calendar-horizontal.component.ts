import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationValidateComponent } from '../dialog/dialog-confirmation-validate/dialog-confirmation-validate.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-horizontal',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './calendar-horizontal.component.html',
  styleUrls: ['./calendar-horizontal.component.css']
})
export class CalendarHorizontalComponent implements OnInit, AfterViewInit {
  @Input() plantId!: number;
  @Input() highlightedDates: string[] = [];
  days: { date: Date; number: number; letters: string }[] = [];
  todayIndex: number = 0;
  plantName: string = 'Monstera';
  readonly dialog = inject(MatDialog);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private router: Router) {}

  ngOnInit() {
    const today = new Date(); 
    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const letters = d
        .toLocaleDateString('fr-FR', { weekday: 'narrow' })
        .toUpperCase() + d
        .toLocaleDateString('fr-FR', { weekday: 'short' })
        .slice(1, 3)
      

      this.days.push({
        date: d,
        number: day,
        letters: letters
      });

      if (d.toDateString() === today.toDateString()) {
        this.todayIndex = this.days.length - 1;
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const container = this.scrollContainer?.nativeElement;
      const scrollTo = (this.todayIndex + 1.5) * 60;
      if (container) {
        container.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }
    }, 100);
  }

  isToday(date: Date): boolean {
    const now = new Date();
    if(date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()) {
        console.log(date)
      }
   
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }

  formatDateToInput(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  isHighlighted(date: Date): boolean {
    const dateStr = this.formatDateToInput(date);
    return this.highlightedDates.includes(dateStr);
  }

  selectedDate: Date | null = null;

  selectDate(date: Date) {
    this.selectedDate = date;
  }

  isSelected(date: Date): boolean {
    return (
      this.selectedDate?.getDate() === date.getDate() &&
      this.selectedDate?.getMonth() === date.getMonth() &&
      this.selectedDate?.getFullYear() === date.getFullYear()
    );
  }

  waterPlant(date: Date | null) {
    /*const dialogRef = this.dialog.open(DialogConfirmationValidateComponent  , {
      width: '500px',
      data: {
        date
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) console.log(date + " Plante arrosé");
    });*/
    if(date) {
      this.router.navigate(['/watering/' + this.plantId], { queryParams: { name: this.plantName, date: date } });
    }
  }

  

}
