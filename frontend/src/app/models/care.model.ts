export enum CareType {
  WATERING = 'WATERING',
  PRUNING = 'PRUNING',
  FERTILIZING = 'FERTILIZING',
  PEST_CONTROL = 'PEST_CONTROL'
}

export interface CareRecord {
  id?: number;
  date: string;
  careType: CareType;
  description: string;
}
