import IRecipe from './Values/IRecipe';

export default class QualityCalculator {
    public static calculate(recipe: IRecipe): number {
        let result = 0;

        for (const requirement of recipe.requirements) {
            result += (requirement.material?.value ?? 0) * (requirement.influence / 100);
        }

        return Math.floor(result);
    }
}
