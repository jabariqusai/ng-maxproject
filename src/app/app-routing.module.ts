import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipes/recipe.resolver';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolver } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'recipes', component: RecipesComponent, resolve: {recipes: RecipesResolver}, canActivate: [AuthGuard], children: [
    {path: '', component: RecipeStartComponent, pathMatch: 'full'},
    {path: 'new', component: RecipeEditComponent},
    {path: ':index', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver}},
    {path: ':index/edit', component: RecipeEditComponent, resolve: {recipe: RecipeResolver}},
  ]},
  {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent},
  {path: '**', redirectTo: 'recipes'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
