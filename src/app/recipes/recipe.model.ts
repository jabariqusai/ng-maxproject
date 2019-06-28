import { Ingredient } from '../shared/ingredient.model';

// Defines a data model (blueprint) for a recipe item
export class Recipe{
    public name: string;
    public description: string;
    public imgPath: string;
    public ingredients: Ingredient[];

    constructor(name: string, desc: string, imgPath: string, ingredients: Ingredient[]){
        this.name = name;
        this.description = desc;
        this.imgPath = imgPath;
        this.ingredients = ingredients;
    }
}