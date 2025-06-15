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
            },
            {
                id: 2,
                name: "Plante 2",
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
  