import { Component, inject, OnInit } from "@angular/core";
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
import { DialogConfirmationCreateComponent } from "../../shared/dialog/dialog-confirmation-create/dialog-confirmation-create.component";
import { SupabaseService } from '../../supabase.service';
import { PlantService } from "../plant/plant.service";
import { Plante } from "../../models/plante.model";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MatDialogModule, PlantListCardComponent, LucideAngularModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent{
  readonly dialog = inject(MatDialog);

  protected readonly Plus = Plus;
  protected readonly QrCode = QrCode;

  constructor(private router: Router, protected qrGeneratorService: QRGeneratorService, protected plantService: PlantService) {}

  openAddPlantDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmationCreateComponent, {
      width: '500px',
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result.status) this.plantService.createPlant(result.id).subscribe();
    })
  }

  qrCode: QRCodeStyling | null = null;

  openQrCodeDialog(event: Event) {
          this.qrCode = this.qrGeneratorService.showQRCode(event, "");
          if(this.qrCode) {
              this.dialog.open(QrGeneratorComponent, {
                  data: {
                      qrCode: this.qrCode,
                      isGlobal: true
                  }
              })
          }
      }

  goToPlant(id: number): void {
    this.router.navigate([`/${id}`])
  }
}