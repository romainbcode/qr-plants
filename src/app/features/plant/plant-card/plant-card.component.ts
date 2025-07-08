import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { PlantService } from "../../../services/plant.service";
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
import { Subject, takeUntil, tap } from "rxjs";

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

    etat: string = 'Hydraté';

    activeTab = 'tab1';

    date: Date | undefined;

    protected readonly QrCode = QrCode;
    protected readonly ChevronLeft  = ChevronLeft;
    protected readonly Calendar = Calendar;

    constructor(protected plantService: PlantService, private activatedRoute: ActivatedRoute, protected qrGeneratorService: QRGeneratorService, private dialog: MatDialog, private router: Router) {
        
    }

    private destroy$ = new Subject<void>();

    selectTab(tab: string) {
        this.activeTab = tab;
    }

    ngOnInit(): void {
        const currentRoutePlantId: number = +this.activatedRoute.snapshot.paramMap.get('id')!;

        if(this.plantService.plantsOfHouse().length === 0) {
            this.plantService.reloadPlantsOfHouse().pipe(
                tap(() => this.plantService.setSelectedPlantId(currentRoutePlantId)),
                takeUntil(this.destroy$)
            ).subscribe();
        }
        else if (!this.plantService.selectedPlant()) {
            this.plantService.setSelectedPlantId(currentRoutePlantId);
        }
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

    goToCalendar() {
        this.router.navigate(['/watering/' + this.plantService.selectedPlant().id]);
    }

    getImagePath(): string {
        switch (this.plantService.selectedPlant().name.toLowerCase()) {
        case 'monstera':
            return 'assets/monstera.png';
        case 'orchide':
            return 'assets/orchidee.png';
        case 'araignee':
            return 'assets/plante-araignee.png';
        case 'pothos':
            return 'assets/pothos.png';
        case 'lemon':
            return 'assets/lemon.png';
        case 'avocado':
            return 'assets/avocado.png';
        default:
            return 'Image introuvable';
        }
    }
}