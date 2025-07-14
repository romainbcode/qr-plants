import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Bean, LucideAngularModule, Sprout } from 'lucide-angular';

@Component({
  selector: 'app-badge-plant-unit',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './badge-plant-unit.component.html',
  styleUrl: './badge-plant-unit.component.css'
})
export class BadgePlantUnitComponent {
  @Input() typeDisplayed!: 'plante' | 'bouture';

  protected readonly Bean = Bean;
  protected readonly Sprout = Sprout;

}
