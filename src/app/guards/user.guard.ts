import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { filter, first, map, mergeMap, of, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export const userGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.asSelectedUser()) return true;

  const storedUserId = localStorage.getItem(UserService.USER_SELECTED_ID);
  if (!storedUserId) {
    router.navigate(['/choose-profile']);
    return false;
  }

  return toObservable(userService.asSelectedUser).pipe(
    filter((user) => user === true),
    map((user) => {
      if (user) return true;
      router.navigate(['/choose-profile']);
      return false;
    })
  );
};
