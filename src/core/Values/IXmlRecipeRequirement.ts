export default interface IXmlRecipeRequirement {
    id: number;
    recipeId: number;
    materialObjectTypeId: number;
    quality: number;
    influence: number;
    quantity: number;
    isRegionItemRequired: number;
}
