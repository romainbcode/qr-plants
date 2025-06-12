import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QRGeneratorService } from './qr-generator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-code-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr-generator.component.html'
})
export class QrGeneratorComponent {
  @ViewChild('qrContainer', { static: false }) qrContainer!: ElementRef<HTMLElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { qrCode: any}) {}
  
  ngAfterViewInit() {
    setTimeout(() => {
        const containerEl = this.qrContainer?.nativeElement;
        if (containerEl && this.data.qrCode) {
          containerEl.innerHTML = '';
          this.data.qrCode.append(containerEl);
        }
      }, 0);
  }

}
