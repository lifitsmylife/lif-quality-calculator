import QualityCalculator from '../QualityCalculator';
import IRecipe from './IRecipe';
import IRecipeRequirement from './IRecipeRequirement';

export default class Recipe implements IRecipe {
    public id: number;
    public name: string;
    public requirements: IRecipeRequirement[];

    public get result(): number {
        return QualityCalculator.calculate(this);
    }

    public constructor(recipe: IRecipe) {
        this.id = recipe.id;
        this.name = recipe.name;
        this.requirements = recipe.requirements;
    }
}
