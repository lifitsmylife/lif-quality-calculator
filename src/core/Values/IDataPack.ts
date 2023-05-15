import IXmlObjectsType from './IXmlObjectsType';
import IXmlRecipe from './IXmlRecipe';
import IXmlRecipeRequirement from './IXmlRecipeRequirement';

export default interface IDataPack {
    xmlRecipes: IXmlRecipe[];
    xmlObjectsTypes: IXmlObjectsType[];
    xmlRecipeRequirements: IXmlRecipeRequirement[];
}
