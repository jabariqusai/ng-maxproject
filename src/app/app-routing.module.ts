import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: '**', redirectTo: '/recipes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
