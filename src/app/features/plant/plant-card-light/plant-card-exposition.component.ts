import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, Sun } from 'lucide-angular';

@Component({
  selector: 'app-plant-card-exposition',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './plant-card-exposition.component.html',
  styleUrl: './plant-card-exposition.component.css'
})
export class PlantCardExpositionComponent {
  @Input() exposition: number = 0;
  @Input() direction: string = "";

  protected readonly Sun = Sun;
}
