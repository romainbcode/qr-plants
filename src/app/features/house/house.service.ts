import { Injectable, signal } from "@angular/core";
import { from, Observable, tap } from "rxjs";
import { SupabaseService } from "../../supabase.service";

export interface House {
    id: number;
    nom: string;
    created_at?: string;
}

@Injectable({
    providedIn: 'root',
})
export class HouseService {
    houses = signal<House[]>([]);

    constructor(private supabaseService: SupabaseService) {
        this.reloadHouses().subscribe();
    }

    reloadHouses(): Observable<House[]> {
        return this.getHouses().pipe(
            tap(houses => {
                this.houses.set(houses);
            })
        );
    }

    getHouses(): Observable<House[]> {
        return from(
            this.supabaseService.client
                .from('houses')
                .select('*')
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Erreur récupération maisons:', error);
                        throw error;
                    }
                    
                    return data || [];
                })
        );
    }

    createHouse(houseData: Omit<House, 'id' | 'created_at'>): Observable<House> {
        return from(
            this.supabaseService.client
                .from('houses')
                .insert(houseData)
                .select()
                .single()
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Erreur création maison:', error);
                        throw error;
                    }
                    
                    return data;
                })
        );
    }

    deleteHouse(id: number): Observable<void> {
        return from(
            this.supabaseService.client
                .from('houses')
                .delete()
                .eq('id', id)
                .then(({ error }) => {
                    if (error) {
                        console.error('Erreur suppression maison:', error);
                        throw error;
                    }
                })
        );
    }
} 