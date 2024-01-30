import { CanActivateFn, Router } from '@angular/router';
import { UserAuthenService } from '../Services/user-auth.service';
import { inject } from '@angular/core';

export const userGuardGuard: CanActivateFn = (route, state) => {
  const userAuth = inject(UserAuthenService)
  const router = inject(Router);

  if (userAuth.isUserLogged) {
    return true
  }
  else {
    alert("Please login to the administrator account");
    router.navigate(['/login']);
    return false;
  }

};
