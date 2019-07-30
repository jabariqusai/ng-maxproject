import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { exhaustMap, take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
    ) {}

  canActivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
    ): Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select('auth').pipe(
        take(1),
        map(data => data.user),
        map(user => {
          const isAuthenticated = !!user;
          if (isAuthenticated) {
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        })
      );
  }
}
