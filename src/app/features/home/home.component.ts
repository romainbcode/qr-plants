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

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MatDialogModule, PlantListCardComponent, LucideAngularModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  protected readonly Plus = Plus;
  protected readonly QrCode = QrCode;

  plants = [
    {
      id: 1,
      temperature: 22,
      exposition: 65,
      humidity: 60
    },
    {
      id: 2,
      temperature: 18,
      exposition: 50,
      humidity: 70
    },
    {
      id: 3,
      temperature: 25,
      exposition: 40,
      humidity: 80
    },
    {
      id: 4,
      temperature: 22,
      exposition: 80,
      humidity: 60
    },
    {
      id: 5,
      temperature: 18,
      exposition: 50,
      humidity: 70
    },
    {
      id: 6,
      temperature: 25,
      exposition: 40,
      humidity: 80
    }
  ];

  constructor(private router: Router, protected qrGeneratorService: QRGeneratorService, private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.testSupabaseConnection();
  }

  async testSupabaseConnection() {
    console.log('🔄 Test de connexion Supabase...');
    const result = await this.supabaseService.testConnection();
    
    if (result) {
      console.log('🎉 Connexion réussie !');
    } else {
      console.log('❌ Échec de la connexion');
    }
  }

  async testConnection() {
    await this.testSupabaseConnection();
  }

  openAddPlantDialog(): void {
    this.dialog.open(DialogConfirmationCreateComponent, {
      width: '500px',
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