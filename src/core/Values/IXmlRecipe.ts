export default interface IXmlRecipe {
    id: number;
    name: string;
    description: number;
    skillTypeId: number;
    skillLvl: number;
    resultObjectTypeId: number;
    skillDepends: number;
    quantity: number;
    autorepeat: number;
    isBlueprint: number;
    imagePath: string;
}
