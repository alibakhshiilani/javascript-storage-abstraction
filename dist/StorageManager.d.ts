type StorageChangeAction = 'set' | 'remove';
type StorageChangeListener = (key: string, action: StorageChangeAction, value: any) => void;
declare class StorageManager {
    private storageDriver;
    private persistentKeys;
    private changeListeners;
    constructor(storageDriver: LocalStorageDriver | IndexedDBDriver | CacheDriver);
    set<T>(key: string, value: T): void;
    get<T>(key: string): T | null;
    remove(key: string): void;
    persistKey(key: string): void;
    unpersistKey(key: string): void;
    onChange(callback: StorageChangeListener): void;
    removeChangeListener(callback: StorageChangeListener): void;
    private _notifyChange;
}
