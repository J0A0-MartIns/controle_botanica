import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant.model';

@Component({
  selector: 'app-plant-form',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './plant-form.component.html',
  styleUrl: './plant-form.component.css'
})
export class PlantFormComponent {
  plant: Plant = {
    species: '',
    location: '',
    acquisitionDate: new Date().toISOString().substring(0, 10),
    notes: ''
  };

  submitting: boolean = false;
  error: string | null = null;

  constructor(
    private plantService: PlantService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.plant.species.trim()) {
      this.error = 'O nome da espécie é obrigatório.';
      return;
    }
    
    this.submitting = true;
    this.error = null;

    this.plantService.addPlant(this.plant).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Ocorreu um erro ao salvar a planta. Verifique a conexão com o servidor e tente novamente.';
        this.submitting = false;
      }
    });
  }
}
