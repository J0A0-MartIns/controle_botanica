import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant.model';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.css'
})
export class PlantListComponent implements OnInit {
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];
  searchTerm: string = '';
  selectedLocation: string = '';
  loading: boolean = true;
  error: string | null = null;

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants(): void {
    this.loading = true;
    this.error = null;
    this.plantService.getPlants().subscribe({
      next: (data) => {
        this.plants = data;
        this.filteredPlants = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao carregar as plantas. Verifique se o backend está ativo e respondo na porta 8080.';
        this.loading = false;
      }
    });
  }

  filterPlants(): void {
    this.filteredPlants = this.plants.filter(plant => {
      const matchesSearch = plant.species.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            (plant.notes && plant.notes.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesLocation = !this.selectedLocation || plant.location === this.selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }

  getLocations(): string[] {
    const locations = this.plants.map(p => p.location).filter(l => !!l);
    return Array.from(new Set(locations));
  }

  getLastCare(plant: Plant): { date: string, type: string } | null {
    if (!plant.careRecords || plant.careRecords.length === 0) {
      return null;
    }
    const sorted = [...plant.careRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return {
      date: sorted[0].date,
      type: sorted[0].careType
    };
  }

  getCareTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      WATERING: 'Rega',
      PRUNING: 'Poda',
      FERTILIZING: 'Adubação',
      PEST_CONTROL: 'Pragas'
    };
    return labels[type] || type;
  }
}
