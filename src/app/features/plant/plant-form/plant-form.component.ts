import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { PlantService } from "../../../services/plant.service";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import QRCodeStyling from "qr-code-styling";
import { QRGeneratorService } from "../../../shared/dialog/dialog-qrcode/dialog-qrcode.service";
@Component({
    selector: 'app-plant-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule, MatDialogModule],
    templateUrl: './plant-form.component.html',
})
export class PlantFormComponent {
  @ViewChild('qrContainer', { static: false }) qrContainer!: ElementRef<HTMLElement>;

  constructor(protected plantService: PlantService, protected qrGeneratorService: QRGeneratorService){}
  
  plantForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
  })

  plantName = '';
  url = '';
  qrCode: QRCodeStyling | null = null;
  
  generateQRCode(event: Event) {
      event.preventDefault();
    
      this.qrCode = this.qrGeneratorService.generateQRCode(event);
      this.plantName = this.plantForm.get('name')?.value;

      setTimeout(() => {
        const containerEl = this.qrContainer?.nativeElement;
        if (containerEl && this.qrCode) {
          containerEl.innerHTML = '';
          this.qrCode.append(containerEl);
          this.url = this.qrCode._options.data;
        }
      }, 0);
    }
}