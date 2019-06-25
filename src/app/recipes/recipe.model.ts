// Defines a data model (blueprint) for a recipe item
export class Recipe{
    public name: string;
    public description: string;
    public imgPath: string;

    constructor(name: string, desc: string, imgPath: string){
        this.name = name;
        this.description = desc;
        this.imgPath = imgPath;
    }
}