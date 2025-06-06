import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, Thermometer } from 'lucide-angular';

@Component({
  selector: 'app-plant-card-temperature',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './plant-card-temperature.component.html',
  styleUrl: './plant-card-temperature.component.css'
})
export class PlantCardTemperatureComponent {
  @Input() temperature: number = 0;
  @Input() direction: string = "";

  protected readonly Thermometer = Thermometer;
}
