import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant.model';
import { CareRecord, CareType } from '../../models/care.model';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './plant-detail.component.html',
  styleUrl: './plant-detail.component.css'
})
export class PlantDetailComponent implements OnInit {
  plant: Plant | null = null;
  careRecords: CareRecord[] = [];
  
  newRecord: CareRecord = {
    date: new Date().toISOString().substring(0, 10),
    careType: CareType.WATERING,
    description: ''
  };
  
  loading: boolean = true;
  error: string | null = null;
  submittingCare: boolean = false;
  successMessage: string | null = null;

  careTypes = Object.values(CareType);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const plantId = Number(idParam);
      this.loadPlantDetails(plantId);
    } else {
      this.router.navigate(['/']);
    }
  }

  loadPlantDetails(plantId: number): void {
    this.loading = true;
    this.error = null;
    this.plantService.getPlant(plantId).subscribe({
      next: (data) => {
        this.plant = data;
        this.loadCareRecords(plantId);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Não foi possível carregar os detalhes da planta.';
        this.loading = false;
      }
    });
  }

  loadCareRecords(plantId: number): void {
    this.plantService.getCareRecords(plantId).subscribe({
      next: (records) => {
        this.careRecords = records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Não foi possível carregar o histórico de cuidados.';
        this.loading = false;
      }
    });
  }

  onSubmitCare(): void {
    if (!this.plant || !this.plant.id) return;
    
    this.submittingCare = true;
    this.successMessage = null;
    
    this.plantService.addCareRecord(this.plant.id, this.newRecord).subscribe({
      next: (savedRecord) => {
        this.careRecords = [savedRecord, ...this.careRecords];
        this.newRecord = {
          date: new Date().toISOString().substring(0, 10),
          careType: CareType.WATERING,
          description: ''
        };
        this.successMessage = 'Registro de cuidado adicionado com sucesso!';
        this.submittingCare = false;
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao salvar o registro de cuidado.');
        this.submittingCare = false;
      }
    });
  }

  getCareTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      WATERING: 'Rega',
      PRUNING: 'Poda',
      FERTILIZING: 'Adubação',
      PEST_CONTROL: 'Controle de Pragas'
    };
    return labels[type] || type;
  }

  getCareTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      WATERING: 'water_drop',
      PRUNING: 'content_cut',
      FERTILIZING: 'workspace_premium',
      PEST_CONTROL: 'bug_report'
    };
    return icons[type] || 'help_outline';
  }
}
