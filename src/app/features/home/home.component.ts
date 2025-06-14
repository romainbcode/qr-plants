import { Component, inject } from "@angular/core";
import {
  MatDialog,
  MatDialogModule,
  
} from '@angular/material/dialog';
import { PlantFormComponent } from "../plant/plant-form/plant-form.component";
import { PlantListCardComponent } from "../plant/plant-list-card/plant-list-card.component";
import { PlantButtonAddComponent } from "../plant/plant-button-add/plant-button-add.component";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { LucideAngularModule, Plus, QrCode } from "lucide-angular";
import QRCodeStyling from "qr-code-styling";
import { QrGeneratorComponent } from "../../shared/dialog/dialog-qrcode/dialog-qrcode.component";
import { QRGeneratorService } from "../../shared/dialog/dialog-qrcode/dialog-qrcode.service";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MatDialogModule, PlantListCardComponent, PlantButtonAddComponent, LucideAngularModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, protected qrGeneratorService: QRGeneratorService) {}

  readonly dialog = inject(MatDialog);
  protected readonly Plus = Plus;
  protected readonly QrCode = QrCode;

  plants = [
    {
      temperature: 22,
      exposition: 65,
      humidity: 60
    },
    {
      temperature: 18,
      exposition: 50,
      humidity: 70
    },
    {
      temperature: 25,
      exposition: 40,
      humidity: 80
    },
    {
      temperature: 22,
      exposition: 80,
      humidity: 60
    },
    {
      temperature: 18,
      exposition: 50,
      humidity: 70
    },
    {
      temperature: 25,
      exposition: 40,
      humidity: 80
    }
  ];

  openGenerateQRCode(): void {
    this.dialog.open(PlantFormComponent, {
      width: '500px',
    })
  }

  qrCode: QRCodeStyling | null = null;

  openQrCodeDialog(event: Event) {
          this.qrCode = this.qrGeneratorService.showQRCode(event, "");
          if(this.qrCode) {
              this.dialog.open(QrGeneratorComponent, {
                  data: {
                      qrCode: this.qrCode
                  }
              })
          }
      }

  goToPlant(id: number): void {
    this.router.navigate([`/$id`])
  }
}