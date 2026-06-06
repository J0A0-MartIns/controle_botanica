import { CareRecord } from './care.model';

export interface Plant {
  id?: number;
  species: string;
  location: string;
  acquisitionDate: string;
  notes?: string;
  careRecords?: CareRecord[];
}
