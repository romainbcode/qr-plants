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
import { PlantService } from '../../../services/plant.service';
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
  readonly dialogRef = inject(MatDialogRef<DialogConfirmationCreateComponent>);
  protected readonly Leaf = Leaf;
  protected readonly X = X;

  plantForm = new UntypedFormGroup({  
    id: new UntypedFormControl('', [Validators.required]),
  })

  constructor(protected plantService: PlantService) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    const plant: {status: boolean, id: number} = {
      status: true,
      id: this.plantForm.get('id')?.value,
    }
    this.dialogRef.close(plant);
  }

  selectedPlantId: number | null = null;

  selectPlant(id: number) {
    this.selectedPlantId = id;
    this.plantForm.get('id')?.setValue(id);
  }

  getImagePath(name: string): string {
    switch (name.toLowerCase()) {
    case 'monstera':
        return 'assets/monstera.png';
    case 'orchide':
        return 'assets/orchidee.png';
    case 'araignee':
        return 'assets/plante-araignee.png';
    case 'pothos':
        return 'assets/pothos.png';
    case 'lemon':
        return 'assets/lemon.png';
    case 'avocado':
        return 'assets/avocado.png';
    default:
        return 'Image introuvable';
    }
}

}