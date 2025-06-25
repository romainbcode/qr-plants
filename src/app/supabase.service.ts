import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  // Client Supabase public pour les autres services
  public readonly client: SupabaseClient;

  constructor() {
    this.client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // Méthode de test de connexion (optionnelle)
  async testConnection() {
    try {
      const { data, error } = await this.client
        .from('plantes')
        .select('*')
        .limit(1);

      if (error) {
        console.error('Erreur Supabase:', error);
        return false;
      }

      console.log('✅ Connexion Supabase réussie !');
      return true;
    } catch (error) {
      console.error('❌ Erreur de connexion Supabase:', error);
      return false;
    }
  }

  async getAllPlants() {
    const { data, error } = await this.client
      .from('plants')
      .select('*');
    
    if (error) throw error;
    return data;
  }
}