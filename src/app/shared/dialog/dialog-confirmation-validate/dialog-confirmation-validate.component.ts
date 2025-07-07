import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Droplets, LucideAngularModule, X } from 'lucide-angular';
import { CalendarComponent } from "../../calendar/calendar.component";

@Component({
  selector: 'app-dialog-confirmation-validate',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose, CommonModule, LucideAngularModule, CalendarComponent],
  templateUrl: './dialog-confirmation-validate.component.html',
  styleUrl: './dialog-confirmation-validate.component.css'
})
export class DialogConfirmationValidateComponent {
  readonly dialogRef = inject(MatDialogRef<DialogConfirmationValidateComponent>);
  protected readonly Droplets = Droplets;
  protected readonly X = X;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { date: Date }) {}

  cancel(): void {
    return this.dialogRef.close(false);
  }

  confirm(): void {
    return this.dialogRef.close(true);
  }
}
