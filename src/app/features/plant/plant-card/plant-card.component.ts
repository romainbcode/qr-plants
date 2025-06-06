import { Component, Inject, OnInit } from "@angular/core";
import { PlantService } from "../plant.service";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { BadgeDifficultyComponent } from "../../../shared/badge/badge-difficulty/badge-difficulty.component";
import { BadgeStatus } from "../../../shared/badge/badge-status/badge-status.component";
import { PlantCardTemperatureComponent } from "../plant-card-temperature/plant-card-temperature.component";
import { PlantCardExpositionComponent } from "../plant-card-light/plant-card-exposition.component";
import { PlantCardHumidityComponent } from "../plant-card-humidity/plant-card-humidity.component";
import { House, LucideAngularModule, QrCode } from "lucide-angular";
import { CalendarComponent } from "../../../shared/calendar/calendar.component";

@Component({
    selector: 'app-plant-card',
    standalone: true,
    imports: [CommonModule, MatDialogModule, BadgeDifficultyComponent, BadgeStatus,
        PlantCardTemperatureComponent, PlantCardExpositionComponent, PlantCardHumidityComponent,
    LucideAngularModule, CalendarComponent],
    templateUrl: './plant-card.component.html',
    styleUrl: './plant-card.component.css'
})
export class PlantCardComponent implements OnInit {
    constructor(protected plantService: PlantService, private activatedRoute: ActivatedRoute) {}

    currentIdRoute: string = '';
    plant: any = {};

    etat: string = 'Hydraté';

    temperature = 20;
    exposition = 50;
    humidity = 75;

    title: string = "Monstera";

    activeTab = 'tab1';

    date: Date | undefined;

    protected readonly QrCode = QrCode;
    protected readonly House = House;

    selectTab(tab: string) {
        this.activeTab = tab;
    }

    ngOnInit(): void {
        this.currentIdRoute = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');
        this.plant = this.plantService.getPlantById(this.currentIdRoute).subscribe();
    }

    getImagePath(): string {
        switch (this.title.toLowerCase()) {
        case 'monstera':
            return 'assets/monstera.png';
        case 'orchide':
            return 'assets/orchidee.png';
        case 'cactus':
            return 'assets/cactus.png';
        // Ajoute d'autres cas selon tes besoins
        default:
            return 'assets/default.png'; // fallback
        }
    }
}