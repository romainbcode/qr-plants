import { computed, Injectable, signal } from "@angular/core";
import { from, map, mergeMap, Observable, of, tap } from "rxjs";
import { SupabaseService } from "../supabase.service";
import { Plante } from "../models/plante.model";

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    getImagePath(name: string): string {
      switch (name.trim().toLowerCase()) {
        case 'monstera':
          return 'assets/monstera.png';
        case 'orchide':
          return 'assets/orchidee.png';
        case 'araignee':
          return 'assets/plante-araignee.png';
        case 'pothos':
          return 'assets/pothos.png';
        case 'lemon':
          return 'assets/lemon.png';
        case 'avocat':
          return 'assets/avocado.png';
        default:
          return 'Image introuvable';
      }
    }
}