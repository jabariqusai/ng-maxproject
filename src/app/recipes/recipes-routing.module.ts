import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipesResolver } from './recipes-resolver.service';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipe.resolver';


const routes: Routes = [
  {path: '', component: RecipesComponent, resolve: {recipes: RecipesResolver}, canActivate: [AuthGuard], children: [
    {path: '', component: RecipeStartComponent, pathMatch: 'full'},
    {path: 'new', component: RecipeEditComponent},
    {path: ':index', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver}},
    {path: ':index/edit', component: RecipeEditComponent, resolve: {recipe: RecipeResolver}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
