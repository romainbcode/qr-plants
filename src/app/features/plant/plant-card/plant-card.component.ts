import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { PlantService } from "../plant.service";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { BadgeDifficultyComponent } from "../../../shared/badge/badge-difficulty/badge-difficulty.component";
import { BadgeStatus } from "../../../shared/badge/badge-status/badge-status.component";
import { PlantCardTemperatureComponent } from "../plant-card-temperature/plant-card-temperature.component";
import { PlantCardExpositionComponent } from "../plant-card-light/plant-card-exposition.component";
import { PlantCardHumidityComponent } from "../plant-card-humidity/plant-card-humidity.component";
import { Calendar, ChevronLeft, House, LucideAngularModule, QrCode } from "lucide-angular";
import { CalendarComponent } from "../../../shared/calendar/calendar.component";
import { CalendarHorizontalComponent } from "../../../shared/calendar-horizontal/calendar-horizontal.component";
import QRCodeStyling from "qr-code-styling";
import { QrGeneratorComponent } from "../../../shared/dialog/dialog-qrcode/dialog-qrcode.component";
import { QRGeneratorService } from "../../../shared/dialog/dialog-qrcode/dialog-qrcode.service";

@Component({
    selector: 'app-plant-card',
    standalone: true,
    imports: [CommonModule, MatDialogModule, BadgeDifficultyComponent, BadgeStatus,
        PlantCardTemperatureComponent, PlantCardExpositionComponent, PlantCardHumidityComponent,
    LucideAngularModule, CalendarComponent, CalendarHorizontalComponent, MatDialogModule],
    templateUrl: './plant-card.component.html',
    styleUrl: './plant-card.component.css'
})
export class PlantCardComponent implements OnInit {
    @ViewChild('qrContainer', { static: false }) qrContainer!: ElementRef<HTMLElement>;

    constructor(protected plantService: PlantService, private activatedRoute: ActivatedRoute, protected qrGeneratorService: QRGeneratorService, private dialog: MatDialog, private router: Router) {}

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
    protected readonly ChevronLeft  = ChevronLeft;
    protected readonly Calendar = Calendar;

    selectTab(tab: string) {
        this.activeTab = tab;
    }

    ngOnInit(): void {
        this.currentIdRoute = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');
        this.plant = this.plantService.getPlantById(this.currentIdRoute).subscribe();
    }

    qrCode: QRCodeStyling | null = null;

    openQrCodeDialog(event: Event) {
        this.qrCode = this.qrGeneratorService.showQRCode(event, "10");
        if(this.qrCode) {
            this.dialog.open(QrGeneratorComponent, {
                data: {
                    qrCode: this.qrCode,
                    isGlobal: false
                }
            })
        }
    }

    goToHome() {
        this.router.navigate(['/']);
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