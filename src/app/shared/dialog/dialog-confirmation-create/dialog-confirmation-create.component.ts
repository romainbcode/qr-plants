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
import { Check, Leaf, LucideAngularModule, X } from 'lucide-angular';
import { PlantService } from '../../../features/plant/plant.service';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BadgeDifficultyComponent } from '../../badge/badge-difficulty/badge-difficulty.component';
import { BadgePlantUnitComponent } from '../../badge/badge-plant-unit/badge-plant-unit.component';

@Component({
  selector: 'app-dialog-confirmation-create',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose, LucideAngularModule, 
    FormsModule, ReactiveFormsModule, CommonModule, BadgeDifficultyComponent, BadgePlantUnitComponent],
  templateUrl: './dialog-confirmation-create.component.html',
  styleUrl: './dialog-confirmation-create.component.css'
})
export class DialogConfirmationCreateComponent {
  constructor(protected plantService: PlantService) {}
  readonly dialogRef = inject(MatDialogRef<DialogConfirmationCreateComponent>);
  protected readonly Leaf = Leaf;
  protected readonly X = X;

  plantForm = new UntypedFormGroup({  
    id: new UntypedFormControl('', [Validators.required]),
  })

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    //appeler dans le fichier json la plante avec cet id
    const plant = {
      status: true,
      id: this.plantForm.get('id')?.value,
    }
    this.dialogRef.close(plant);
  }

  selectedPlantId: number | null = null;

selectPlant(id: number) {
  this.selectedPlantId = id;
  this.plantForm.get('name')?.setValue(id); // Met à jour le formControl
}

}