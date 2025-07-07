import { computed, Injectable, signal } from "@angular/core";
import { from, map, mergeMap, Observable, of, tap } from "rxjs";
import { SupabaseService } from "../supabase.service";
import { Plante } from "../models/plante.model";

@Injectable({
    providedIn: 'root',
})
export class PlantService {
    plantsOfHouse = signal<any[]>([]);
    plants = signal<any[]>([]);
    wateringDate = signal<Date | null>(null);
    selectedPlantId = signal<number | null>(null);

    selectedPlant = computed(() => {
        return this.plantsOfHouse().find(p => p.id === this.selectedPlantId());
    })

    constructor(private supabaseService: SupabaseService) {
        this.reloadPlantsOfHouse().subscribe();
        this.reloadPlants().subscribe();
    }

    setSelectedPlantId(id: number): void {
        this.selectedPlantId.set(id);
    }

    setWateringDate(date: Date): void {
        this.wateringDate.set(date);
    }

    reloadPlantsOfHouse(): Observable<any[]> {
        return this.getPlantsByHouseId(1).pipe(
            tap(plantsOfHouse => {
                this.plantsOfHouse.set(plantsOfHouse);
            })
        );
    }

    associatePlantToHouse(plantId: number, houseId: number): Observable<any> {
        console.log(plantId)
        return from(
            this.supabaseService.client
                .from('plantes_logement')
                .insert({ plante_id: plantId, logement_id: houseId })
        )
        .pipe(
            mergeMap(() => this.reloadPlantsOfHouse())
        );
    }

    desassociatePlantToHouse(plantId: number, houseId: number): Observable<any> {
        return from(
            this.supabaseService.client
                .from('plantes_logement')
                .delete()
                .eq('plante_id', plantId)
                .eq('logement_id', houseId)     
        )
        .pipe(
            map(({ data, error }) => {
                if (error) {
                    console.error('Erreur Supabase:', error);
                    throw error;
                }
                return data;
            })
        );
    }

    reloadPlants(): Observable<any[]> {
        return this.getPlants().pipe(
            tap(plants => {
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

    getPlantById(id: string): Observable<Plante> {
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

                    if(!data) {
                        throw new Error('Plante non trouvée');
                    }

                    return this.mapPlante(data);
                })
        );
    }

    wateringPlant(user_id: number, plantes_logement_id: number, date: Date): Observable<any> {
        return from(
            this.supabaseService.client
                .from('arrosages')
                .insert({
                    user_id: user_id,
                    plantes_logement_id: plantes_logement_id,
                    date: date,
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
            created_at: plant.created_at,
        };
    }
    
}
  