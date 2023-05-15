import IRecipeMaterial from './IRecipeMaterial';

export default interface IRecipeRequirement {
    id: number;
    influence: number;
    material?: IRecipeMaterial | null;
}
