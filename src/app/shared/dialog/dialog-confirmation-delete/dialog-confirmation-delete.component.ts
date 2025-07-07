import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef
} from '@angular/material/dialog';
import { LucideAngularModule, Trash, X } from 'lucide-angular';

@Component({
  selector: 'app-dialog-confirmation-delete',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose, LucideAngularModule],
  templateUrl: './dialog-confirmation-delete.component.html',
  styleUrl: './dialog-confirmation-delete.component.css'
})
export class DialogConfirmationDeleteComponent {
  readonly dialogRef = inject(MatDialogRef<DialogConfirmationDeleteComponent>);
  protected readonly Trash = Trash;
  protected readonly X = X;

  cancel(): void {
    this.dialogRef.close(false)
  }

  confirm(): void {
    this.dialogRef.close(true)
  }
}