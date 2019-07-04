import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { NewRecipeComponent } from './recipes/new-recipe/new-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipes/recipe.resolver';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: RecipeStartComponent, pathMatch: 'full'},
    {path: 'new', component: NewRecipeComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver}},
    {path: ':id/edit', component: RecipeEditComponent, resolve: {recipe: RecipeResolver}},
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: '**', redirectTo: 'recipes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
