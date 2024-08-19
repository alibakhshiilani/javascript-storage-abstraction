"use strict";
class StorageManager {
    constructor(storageDriver) {
        this.storageDriver = storageDriver;
        this.persistentKeys = new Set();
        this.changeListeners = [];
    }
    set(key, value) {
        this._notifyChange(key, 'set', value);
        this.storageDriver.set(key, value);
    }
    get(key) {
        return this.storageDriver.get(key);
    }
    remove(key) {
        if (this.persistentKeys.has(key)) {
            console.warn(`Key "${key}" is persistent and cannot be removed.`);
            return;
        }
        this._notifyChange(key, 'remove', null);
        this.storageDriver.remove(key);
    }
    persistKey(key) {
        this.persistentKeys.add(key);
    }
    unpersistKey(key) {
        this.persistentKeys.delete(key);
    }
    onChange(callback) {
        this.changeListeners.push(callback);
    }
    removeChangeListener(callback) {
        this.changeListeners = this.changeListeners.filter(listener => listener !== callback);
    }
    _notifyChange(key, action, value) {
        this.changeListeners.forEach(listener => listener(key, action, value));
    }
}
//# sourceMappingURL=StorageManager.js.map