import { Injectable, signal } from "@angular/core";
import { Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PlantService {
    plants = signal<any[]>([]);

    constructor() {
        this.reloadPlants().subscribe();
    }

    reloadPlants(): Observable<any[]> {
        return this.getPlants().pipe(
            tap((plants) => {
                this.plants.set(plants);
            })
        )
    }

    getPlants(): Observable<any[]> {
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
  