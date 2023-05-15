import IDataLoaderOptions from './Values/IDataLoaderOptions';
import Language from './Values/Language';
import IXmlObjectsType from './Values/IXmlObjectsType';
import IXmlRecipe from './Values/IXmlRecipe';
import IXmlRecipeRequirement from './Values/IXmlRecipeRequirement';
import LifVersion from './Values/LifVersion';
import parse from 'xml-parser';
import camelCase from 'camelcase';
import IDataPack from './Values/IDataPack';

type PropertyDiscriminator<T = unknown> = (node: parse.Node, xmlFileName: string) => T;

export default class DataLoader {
    private _lang: Language;
    private _version: LifVersion;
    private _options: IDataLoaderOptions;
    private _propertyDiscriminators: { [propertyName: string]: PropertyDiscriminator };

    public constructor(
        options: IDataLoaderOptions,
        version: LifVersion = LifVersion.LifMmoRelaunch,
        lang: Language = Language.Eu,
    ) {
        this._lang = lang;
        this._version = version;
        this._options = options;
        this._propertyDiscriminators = {};

        this.setPropertyDiscriminator<string>('name', (property) => property.content ?? '');

        this.setPropertyDiscriminator<string>('imagePath', (property) => {
            const value = property.content ?? '';
            const index = value.lastIndexOf('\\');

            return '/' + this._options.imageUri + '/' + value.substring(index + 1, value.length);
        });
    }

    public async loadAsync(): Promise<IDataPack> {
        const data = await Promise.all([
            this._getSerializedXmlFileContent<IXmlRecipe>('recipe.xml'),
            this._getSerializedXmlFileContent<IXmlObjectsType>('objects_types.xml'),
            this._getSerializedXmlFileContent<IXmlRecipeRequirement>('recipe_requirement.xml'),
        ]);

        return {
            xmlRecipes: data[0],
            xmlObjectsTypes: data[1],
            xmlRecipeRequirements: data[2],
        };
    }

    public setPropertyDiscriminator<T = string>(propertyName: string, discriminator: PropertyDiscriminator<T>) {
        this._propertyDiscriminators[propertyName] = discriminator;
    }

    private async _getSerializedXmlFileContent<T>(xmlFileName: string): Promise<T[]> {
        const content = await this._getXmlFileContent(xmlFileName);

        if (!content) {
            return [];
        }

        const xml = parse(content);
        const rows = xml.root.children;

        const result: T[] = new Array(rows.length);

        for (let index = 0; index < result.length; index++) {
            const row = rows[index];

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const recipe: any = {};
            const properties = row.children;

            for (const property of properties) {
                const propertyName = camelCase(property.name);
                const discriminator = this._propertyDiscriminators[propertyName];

                if (discriminator) {
                    recipe[propertyName] = discriminator(property, xmlFileName);
                } else {
                    const stringContent = property.content ?? '';
                    const numericContent = parseInt(stringContent, 10);

                    recipe[propertyName] = isNaN(numericContent) ? stringContent : numericContent;
                }
            }

            result[index] = recipe as T;
        }

        return result;
    }

    private async _getXmlFileContent(xmlFileName: string): Promise<string> {
        const uri =
            '/' +
            this._options.dataUri +
            '/' +
            this._version +
            '/' +
            this._lang +
            '/' +
            xmlFileName +
            '?_v=' +
            this._options.appVersion;
        const response = await fetch(uri);

        return response.text();
    }
}
