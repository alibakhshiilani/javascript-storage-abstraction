type StorageChangeAction = 'set' | 'remove';
type StorageChangeListener = (key: string, action: StorageChangeAction, value: any) => void;

class StorageManager {
  private storageDriver: LocalStorageDriver | IndexedDBDriver | CacheDriver;
  private persistentKeys: Set<string>;
  private changeListeners: StorageChangeListener[];

  constructor(storageDriver: LocalStorageDriver | IndexedDBDriver | CacheDriver) {
    this.storageDriver = storageDriver;
    this.persistentKeys = new Set();
    this.changeListeners = [];
  }

  set<T>(key: string, value: T): void {
    this._notifyChange(key, 'set', value);
    this.storageDriver.set(key, value);
  }

  get<T>(key: string): T | null {
    return this.storageDriver.get(key);
  }

  remove(key: string): void {
    if (this.persistentKeys.has(key)) {
      console.warn(`Key "${key}" is persistent and cannot be removed.`);
      return;
    }
    this._notifyChange(key, 'remove', null);
    this.storageDriver.remove(key);
  }

  persistKey(key: string): void {
    this.persistentKeys.add(key);
  }

  unpersistKey(key: string): void {
    this.persistentKeys.delete(key);
  }

  onChange(callback: StorageChangeListener): void {
    this.changeListeners.push(callback);
  }

  removeChangeListener(callback: StorageChangeListener): void {
    this.changeListeners = this.changeListeners.filter(listener => listener !== callback);
  }

  private _notifyChange(key: string, action: StorageChangeAction, value: any): void {
    this.changeListeners.forEach(listener => listener(key, action, value));
  }
}
