import { Component, ElementRef, inject, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LucideAngularModule, Printer } from 'lucide-angular';

@Component({
  selector: 'app-qr-code-popup',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose, LucideAngularModule],
  templateUrl: './dialog-qrcode.component.html',
  styleUrl: './dialog-qrcode.component.css'
})
export class QrGeneratorComponent {
  readonly dialogRef = inject(MatDialogRef<QrGeneratorComponent>);
  @ViewChild('qrContainer', { static: false }) qrContainer!: ElementRef<HTMLElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { qrCode: any, isGlobal: boolean}) {}

  protected readonly Printer = Printer;
  
  ngAfterViewInit() {
    setTimeout(() => {
        const containerEl = this.qrContainer?.nativeElement;
        if (containerEl && this.data.qrCode) {
          containerEl.innerHTML = '';
          this.data.qrCode.append(containerEl);
        }
      }, 0);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    window.print();
    this.dialogRef.close(true);
  }

}
