import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-badge-status',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './badge-status.component.html',
    styleUrl: './badge-status.component.css'
})
export class BadgeStatus {
    @Input() etat: string = "";

    getBadgeClass() {
        switch(this.etat) {
            case "Déshydraté": {
                return "badge-danger";
            };
            case "Hydraté": {
                return "badge-success";
            };
            default: 
                return "";
        }
    }
}