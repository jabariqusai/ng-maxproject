import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(private dataService: DataStorageService) { }

  resolve(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot): Observable<Recipe[]> {
      return this.dataService.getRecipes();
    }
}
