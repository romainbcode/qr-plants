export interface Plante {
    id: number;
    name: string;
    particularity?: string;
    difficulty: number;
    humidity: number;
    exposition: number;
    temperature: number;
    description_reproductivite: string;
    description_origine: string;
    description_toxicite: string;
    conseil_arrosage: string;
    created_at: Date;
    type: string,
  }