import { Injectable, signal } from "@angular/core";
import { from, Observable, of, tap } from "rxjs";
import { SupabaseService } from "../../supabase.service";

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

    /*getPlants(): Observable<any[]> {
        return of([
            {
                id: 1,
                name: "Plante 1",
                difficulty: 2,
                type: "bean"
            },
            {
                id: 2,
                name: "Plante 2",
                difficulty: 3,
                type: "plant"
            },
            {
                id: 3,
                name: "Plante 1",
                difficulty: 2,
                type: "bean"
            },
            {
                id: 4,
                name: "Plante 2",
                difficulty: 3,
                type: "plant"
            },
            {
                id: 5,
                name: "Plante 1",
                difficulty: 2,
                type: "bean"
            },
            {
                id: 6,
                name: "Plante 2",
                difficulty: 3,
                type: "plant"
            }
        ])
    }*/

    getPlants(): Observable<any[]> {
        return from(
            this.supabaseService.client
                .from('plantes')
                .select('*')
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Erreur Supabase:', error);
                        throw error;
                    }
                    
                    // Transformer les données pour correspondre à l'interface Plant
                    return data?.map(plant => ({
                        id: plant.id,
                        name: plant.nom,
                        difficulty: plant.difficulte || 1,
                        //type: this.getPlantType(plant.nom) // Fonction pour déterminer le type
                    })) || [];
                })
        );
    }
    

    getPlantById(id: string): Observable<any> {
        return of({
            id: 2,
            name: "Plante 2",
        })
    }

    createPlant(plant: any) {

    /*return this.httpClient
      .request('POST', '/animal', { body: createAnimalDto })
      .pipe(mergeMap(() => this.reloadAnimaux()));*/
  }
}
  