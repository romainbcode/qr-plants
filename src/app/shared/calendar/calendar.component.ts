import { Component } from '@angular/core';
import { MatCalendarBody } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, MatCalendarBody],
  template: `
    <div class="card p-4">
      <mat-calendar [(selected)]="selectedDate"></mat-calendar>
    </div>
  `,
  styles: [`
    .card {
      max-width: 400px;
      margin: auto;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
  `]
})
export class CalendarComponent {
  selectedDate: Date = new Date();
}
