import { computed, Injectable, signal } from '@angular/core';
import { from, map, mergeMap, Observable, of, tap } from 'rxjs';
import { SupabaseService } from '../supabase.service';
import { Plante } from '../models/plante.model';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  plantsOfHouse = signal<any[]>([]);
  plants = signal<any[]>([]);
  wateringPlantOfHouse = signal<any[]>([]);
  wateringDate = signal<Date | null>(null);
  selectedPlantId = signal<number | null>(null);

  selectedPlant = computed(() => {
    return this.plantsOfHouse().find((p) => p.id === this.selectedPlantId());
  });

  lastWateringPlantDate = computed(() => {
    return this.wateringPlantOfHouse().at(0).date;
  });

  recentWateringPlant = computed(() => {
    return this.wateringPlantOfHouse().slice(0, 3);
  });

  averageDurationWateringPlant = computed(() => {
    if (
      !this.wateringPlantOfHouse() ||
      this.wateringPlantOfHouse().length === 1
    ) {
      return 0;
    }

    const intervals: number[] = [];
    for (let i = 1; i < this.wateringPlantOfHouse().length; i++) {
      const date1 = new Date(this.wateringPlantOfHouse().at(i).date);
      const date2 = new Date(this.wateringPlantOfHouse().at(i - 1).date);
      const diffMs = date1.getTime() - date2.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      intervals.push(diffDays);
    }

    const totalSum = intervals.reduce(
      (sum, currentValue) => sum + currentValue,
      0
    );

    return Math.round(Math.abs(totalSum / intervals.length));
  });

  constructor(private supabaseService: SupabaseService) {
    this.reloadPlantsOfHouse(1).subscribe();
    this.reloadPlants().subscribe();
    //this.reloadWateringPlant(1, 3).subscribe();
  }

  setSelectedPlantId(id: number): void {
    this.selectedPlantId.set(id);
  }

  setWateringDate(date: Date): void {
    this.wateringDate.set(date);
  }

  reloadPlantsOfHouse(houseId: number): Observable<any[]> {
    return this.getPlantsByHouseId(houseId).pipe(
      tap((plantsOfHouse) => {
        this.plantsOfHouse.set(plantsOfHouse);
      })
    );
  }

  associatePlantToHouse(plantId: number, houseId: number): Observable<any> {
    console.log(plantId);
    return from(
      this.supabaseService.client
        .from('plantes_logement')
        .insert({ plante_id: plantId, logement_id: houseId })
    ).pipe(mergeMap(() => this.reloadPlantsOfHouse(houseId)));
  }

  desassociatePlantToHouse(plantId: number, houseId: number): Observable<any> {
    return from(
      this.supabaseService.client
        .from('plantes_logement')
        .delete()
        .eq('plante_id', plantId)
        .eq('logement_id', houseId)
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error('Erreur Supabase:', error);
          throw error;
        }
        return data;
      })
    );
  }

  getAssociationPlantToHouse(
    plantId: number,
    houseId: number
  ): Observable<any> {
    return from(
      this.supabaseService.client
        .from('plantes_logement')
        .select('*')
        .eq('plante_id', plantId)
        .eq('logement_id', houseId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Erreur Supabase:', error);
            throw error;
          }

          if (!data) {
            throw new Error('Association non trouvée');
          }

          return data;
        })
    );
  }

  reloadPlants(): Observable<any[]> {
    return this.getPlants().pipe(
      tap((plants) => {
        this.plants.set(plants);
      })
    );
  }

  getPlantsByHouseId(houseId: number): Observable<Plante[]> {
    return from(
      this.supabaseService.client
        .from('plantes_logement')
        .select('*, plantes(*)')
        .eq('logement_id', houseId)
        .then(({ data, error }) => {
          if (error) {
            console.error('Erreur Supabase:', error);
            throw error;
          }
          return data.map((plant: any) => this.mapPlante(plant.plantes)) || [];
        })
    );
  }

  getPlants(): Observable<Plante[]> {
    return from(
      this.supabaseService.client
        .from('plantes')
        .select('*')
        .then(({ data, error }) => {
          if (error) {
            console.error('Erreur Supabase:', error);
            throw error;
          }

          return data?.map((plant: Plante) => this.mapPlante(plant)) || [];
        })
    );
  }

  getPlantById(id: number): Observable<Plante> {
    return from(
      this.supabaseService.client
        .from('plantes')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Erreur Supabase:', error);
            throw error;
          }

          if (!data) {
            throw new Error('Plante non trouvée');
          }

          return this.mapPlante(data);
        })
    );
  }

  reloadWateringPlant(
    userId: number,
    plantesLogementId: number
  ): Observable<any[]> {
    return this.getWateringPlant(userId, plantesLogementId).pipe(
      tap((waterings) => this.wateringPlantOfHouse.set(waterings))
    );
  }

  wateringPlant(
    user_id: number,
    plantes_logement_id: number,
    date: Date
  ): Observable<any> {
    const dateUTC = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    ).toISOString();
    return from(
      this.supabaseService.client.from('arrosages').insert({
        user_id: user_id,
        plantes_logement_id: plantes_logement_id,
        date: dateUTC,
      })
    ).pipe(
      mergeMap(() => this.reloadWateringPlant(user_id, plantes_logement_id))
    );
  }

  getWateringPlant(
    userId: number,
    plantesLogementId: number
  ): Observable<any[]> {
    return from(
      this.supabaseService.client
        .from('arrosages')
        .select('*, utilisateurs(prenom, image)')
        .eq('user_id', userId)
        .eq('plantes_logement_id', plantesLogementId)
        .order('date', { ascending: false })
        .limit(10)
        .then(({ data, error }) => {
          if (error) {
            console.error('Erreur Supabase:', error);
            throw error;
          }

          if (!data) {
            throw new Error('Arrosage non trouvée');
          }

          return data;
        })
    );
  }

  getWateringDatesPlantOfMonth(plantesLogementId: number): Observable<any[]> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 12)
      .toISOString()
      .slice(0, 10);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      .toISOString()
      .slice(0, 10);

    return from(
      this.supabaseService.client
        .from('arrosages')
        .select('*')
        .eq('plantes_logement_id', plantesLogementId)
        .gte('date', startOfMonth)
        .lte('date', startOfNextMonth)
        .order('date', { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            console.error('Erreur Supabase:', error);
            throw error;
          }

          if (!data) {
            throw new Error('Arrosage non trouvée');
          }

          return data;
        })
    );
  }

  private mapPlante(plant: any): Plante {
    return {
      id: plant.id,
      name: plant.nom,
      difficulty: plant.difficulte,
      humidity: plant.humidite,
      exposition: plant.luminosite,
      temperature: plant.temperature,
      description_reproductivite: plant.description_reproductivite,
      description_origine: plant.description_origine,
      description_toxicite: plant.description_toxicite,
      conseil_arrosage: plant.conseil_arrosage,
      created_at: plant.created_at,
      type: plant.type,
      particularity: plant.particularite,
    };
  }
}
