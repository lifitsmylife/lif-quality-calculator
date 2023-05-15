import DataLoader from './DataLoader';
import IDataPack from './Values/IDataPack';
import Language from './Values/Language';
import LifVersion from './Values/LifVersion';

export default class Application {
    public static xmlDataPack: IDataPack;

    public static async initialize() {
        const dataLoader = new DataLoader(
            { dataUri: 'data', imageUri: 'arts/items', appVersion: process.env.VUE_APP_VERSION ?? '0.0.0' },
            LifVersion.LifMmoRelaunch,
            Language.Eu,
        );

        const data = await dataLoader.loadAsync();

        Object.freeze(data);

        Application.xmlDataPack = data;
    }
}
