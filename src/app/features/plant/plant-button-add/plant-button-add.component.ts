import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BadgeStatus } from "../../../shared/badge/badge-status/badge-status.component";
import { Flower2, LucideAngularModule} from "lucide-angular";

@Component({
    selector: 'app-plant-button-add',
    standalone: true,
    imports: [CommonModule, BadgeStatus, LucideAngularModule],
    templateUrl: './plant-button-add.component.html',
    styleUrl: './plant-button-add.component.css'
})
export class PlantButtonAddComponent{
    protected readonly Flower2  = Flower2;

}