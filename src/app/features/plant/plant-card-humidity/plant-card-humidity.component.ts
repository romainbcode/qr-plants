import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, Droplet } from 'lucide-angular';

@Component({
  selector: 'app-plant-card-humidity',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './plant-card-humidity.component.html',
  styleUrl: './plant-card-humidity.component.css'
})
export class PlantCardHumidityComponent {
  @Input() humidity: number = 0;
  @Input() direction: string = "";

  protected readonly Droplet = Droplet;
}
