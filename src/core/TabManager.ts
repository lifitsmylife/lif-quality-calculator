import ITab from './Values/ITab';
import Recipe from './Values/Recipe';

const LocalStorageTabsKey = 'application:tabs';

type DefaultCallback = (newTab: ITab) => void;
type AnonymousCallback = (...params: unknown[]) => void;
type DefaultListener = { eventName: Event; callback: DefaultCallback };
type AddTabCallback = DefaultCallback;
type DeleteTabCallback = DefaultCallback;
type Callback = AddTabCallback | DeleteTabCallback;
type Event = 'Add' | 'Delete';

class TabManager {
    public tabs: ITab[] = [];
    private _listeners: DefaultListener[] = [];
    private _activeTabIndex = 0;

    get activeTab(): ITab | null {
        return this.activeTabIndex <= this.tabs.length ? this.tabs[this.activeTabIndex] : null;
    }

    get activeTabIndex() {
        return this._activeTabIndex;
    }

    set activeTabIndex(value: number) {
        this._activeTabIndex = value !== -1 && value < this.tabs.length ? value : 0;

        this._kickTheHorse();
    }

    private constructor(tabs: ITab[] = [], activeTabIndex = 0) {
        this.tabs = tabs;
        this.activeTabIndex = activeTabIndex;
    }

    public add(tab: ITab): void {
        this.tabs.push(tab);

        this._activeTabIndex = this.tabs.indexOf(tab);

        this._fireEvent('Add', tab);
        this._kickTheHorse();
    }

    public remove(tab: ITab): void {
        const index = this.tabs.indexOf(tab);

        this.tabs.splice(index, 1);

        if (this.activeTabIndex > this.tabs.length - 1) {
            this.activeTabIndex = this.tabs.length - 1;
        }

        this._fireEvent('Delete', tab);
        this._kickTheHorse();
    }

    public static fromLocalStorage() {
        const def = { tabs: [], activeTabIndex: 0 };

        const json = localStorage.getItem(LocalStorageTabsKey);
        const object = json ? JSON.parse(json) ?? def : def;

        object.tabs.forEach((tab: ITab) => {
            tab.recipe = new Recipe(tab.recipe);
        });

        return new TabManager(object.tabs, object.activeTabIndex);
    }

    public onTabAdded(callback: AddTabCallback) {
        this._addListener('Add', callback);
    }

    public onTabDeleted(callback: DeleteTabCallback) {
        this._addListener('Delete', callback);
    }

    private _addListener(eventName: Event, callback: Callback): void {
        this._listeners.push({ eventName, callback });
        console.log(this._listeners);
    }

    private _fireEvent(eventName: Event, ...params: unknown[]): void {
        this._listeners
            .filter((listener) => listener.eventName === eventName)
            .forEach((listener) => (listener.callback as AnonymousCallback)(...params));
    }

    /**
     * Updates the tabs in the local storage.
     */
    private _kickTheHorse(): void {
        localStorage.setItem(
            LocalStorageTabsKey,
            JSON.stringify({
                tabs: this.tabs,
                activeTabIndex: this.activeTabIndex,
            }),
        );
    }
}

const defaultTabManager = TabManager.fromLocalStorage();

export default defaultTabManager;
