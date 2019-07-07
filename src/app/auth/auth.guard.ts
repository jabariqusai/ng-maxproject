import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { exhaustMap, take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private Router: Router
    ) {}

  canActivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
    ): Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.user.pipe(
        take(1),
        map(user => {
          const isAuthenticated = !!user;
          if (isAuthenticated) {
            return true;
          }
          return this.Router.createUrlTree(['/auth']);
        })
      );
  }
}
