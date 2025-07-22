import { computed, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Observable, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  static readonly USER_SELECTED_ID = 'userSelectedId';
  selectedUser = signal<string | null>(null);
  asSelectedUser = computed(() => this.selectedUser() !== null);

  constructor(private supabaseService: SupabaseService) {
    const storedUserId = localStorage.getItem(UserService.USER_SELECTED_ID);
    if (storedUserId) this.getUser(Number(storedUserId)).subscribe();
  }

  getUser(userId: number): Observable<any> {
    return from(
      this.supabaseService.client
        .from('utilisateurs')
        .select('*')
        .eq('id', userId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Erreur Supabase:', error);
            throw error;
          }

          if (!data) {
            throw new Error('Utilisateur non trouvée');
          }

          return data;
        })
    ).pipe(
      tap((user) => {
        this.selectedUser.set(user);
        localStorage.setItem(UserService.USER_SELECTED_ID, String(userId));
      })
    );
  }

  clearUser() {
    this.selectedUser.set(null);
    localStorage.removeItem(UserService.USER_SELECTED_ID);
  }
}
