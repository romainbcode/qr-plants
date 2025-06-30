import { Injectable, signal } from "@angular/core";
import { from, map, Observable, of, tap } from "rxjs";
import { SupabaseService } from "../../supabase.service";
import { Plante } from "../../models/plante.model";

@Injectable({
    providedIn: 'root',
})
export class PlantService {
    plants = signal<any[]>([]);

    constructor(private supabaseService: SupabaseService) {
        this.reloadPlants().subscribe();
    }

    reloadPlants(): Observable<any[]> {
        return this.getPlants().pipe(
            tap(plants => {
                this.plants.set(plants);
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

    createPlant(plant: Plante): Observable<Plante> {
        return from(
            this.supabaseService.client
                .from('plantes')
                .insert(plant)
            )
            .pipe(
                map(({ data, error }) => {
                    if (error) {
                        console.error('Erreur Supabase:', error);
                        throw error;
                    }

                    const plant = this.mapPlante(data);

                    this.plants.update(plants => [...plants, plant]);

                    return plant;
                })
            )
    }

    deletePlant(id: number): Observable<Plante> {
        return from(
            this.supabaseService.client
                .from('plantes')
                .delete()
                .eq('id', id)
                .select()
            )
            .pipe(
                map(({ data, error }) => {
                    if (error) {
                        console.error('Erreur Supabase:', error);
                        throw error;
                    }

                    this.plants.update(plants => plants.filter(plant => plant.id !== id));

                    return this.mapPlante(data);
                })
            )
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
  