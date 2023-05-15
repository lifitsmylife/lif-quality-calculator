import IRecipeRequirement from './IRecipeRequirement';

export default interface IRecipe {
    id: number;
    name: string;
    result: number;
    requirements: IRecipeRequirement[];
}
