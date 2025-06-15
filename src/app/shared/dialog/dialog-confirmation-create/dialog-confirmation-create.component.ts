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
import { Check, LucideAngularModule } from 'lucide-angular';
import { PlantService } from '../../../features/plant/plant.service';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-confirmation-validate',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose, LucideAngularModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dialog-confirmation-create.component.html',
  styleUrl: './dialog-confirmation-create.component.css'
})
export class DialogConfirmationValidateComponent {
  constructor(protected plantService: PlantService) {}
  readonly dialogRef = inject(MatDialogRef<DialogConfirmationValidateComponent>);
  protected readonly Check = Check;

  plantForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
  })

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
    this.plantService.createPlant("plantname");
  }

  selectedPlantId: number | null = null;

selectPlant(id: number) {
  this.selectedPlantId = id;
  this.plantForm.get('name')?.setValue(id); // Met à jour le formControl
}

}