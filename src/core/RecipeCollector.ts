import Application from './Application';
import CustomId from './Values/CustomId';
import IRecipe from './Values/IRecipe';
import IRecipeMaterial from './Values/IRecipeMaterial';
import IRecipeRequirement from './Values/IRecipeRequirement';
import IXmlRecipe from './Values/IXmlRecipe';
import Recipe from './Values/Recipe';

export default class RecipeCollector {
    public static collect(xmlRecipe: IXmlRecipe): Recipe {
        const recipe: IRecipe = {
            id: xmlRecipe.id,
            name: xmlRecipe.name,
            result: 0,
            requirements: RecipeCollector._getRecipeRequirements(xmlRecipe),
        };

        return new Recipe(recipe);
    }

    private static _getRecipeRequirements(xmlRecipe: IXmlRecipe): IRecipeRequirement[] {
        const requirements: IRecipeRequirement[] =
            Application.xmlDataPack?.xmlRecipeRequirements
                .filter((xmlRequirement) => xmlRequirement.recipeId === xmlRecipe.id)
                .map((xmlRequirement) => ({
                    id: xmlRequirement.id,
                    influence: xmlRequirement.influence,
                    material: this._getRecipeMaterialById(xmlRequirement.materialObjectTypeId),
                })) ?? [];

        requirements.push({
            id: CustomId.Skill,
            influence: xmlRecipe.skillDepends,
            material: {
                id: CustomId.Skill,
                name: 'Skill',
                value: 50,
            },
        });

        return requirements;
    }

    private static _getRecipeMaterialById(id: number): IRecipeMaterial | null {
        const material = Application.xmlDataPack?.xmlObjectsTypes.find((xmlObjectsType) => xmlObjectsType.id === id);

        if (!material) {
            return null;
        }

        return {
            id: material.id,
            name: material.name,
            value: 50,
        };
    }
}
