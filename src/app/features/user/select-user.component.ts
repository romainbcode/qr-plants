// src/app/pages/choose-profile/choose-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-select-user',
  standalone: true,
  template: `
    <h2>Choisissez votre profil</h2>
    @for (p of profiles; track p.id) {
    <button (click)="select(p.id)">
      {{ p.name }}
    </button>
    }
  `,
  styles: [
    `
      h2 {
        margin-bottom: 1rem;
      }
      button {
        margin: 0.5rem;
        padding: 0.5rem 1rem;
      }
    `,
  ],
})
export class SelectUserComponent {
  profiles = [
    { id: 1, name: 'Utilisateur 1' },
    { id: 3, name: 'Utilisateur 2' },
  ];

  constructor(private userService: UserService, private router: Router) {}

  select(id: number) {
    this.userService
      .getUser(id)
      .pipe(tap(() => this.router.navigate(['/home'])))
      .subscribe();
  }
}
