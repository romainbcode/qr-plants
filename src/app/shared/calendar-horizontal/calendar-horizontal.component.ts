import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-horizontal',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './calendar-horizontal.component.html',
  styleUrls: ['./calendar-horizontal.component.css']
})
export class CalendarHorizontalComponent implements OnInit, AfterViewInit {
@Input() highlightedDates: string[] = [];
  days: { date: Date; dayNumber: number; dayInitial: string }[] = [];
  todayIndex: number = 0;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngOnInit() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const dayInitial = d
        .toLocaleDateString('fr-FR', { weekday: 'short' })
        .charAt(0)
        .toUpperCase();

      this.days.push({
        date: d,
        dayNumber: day,
        dayInitial: dayInitial
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
}
