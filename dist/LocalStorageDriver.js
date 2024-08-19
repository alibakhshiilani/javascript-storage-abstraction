"use strict";
class LocalStorageDriver {
    get(key) {
        const value = localStorage.getItem(key);
        if (!value)
            return null;
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    }
    set(key, value) {
        const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, valueToStore);
    }
    remove(key) {
        localStorage.removeItem(key);
    }
}
//# sourceMappingURL=LocalStorageDriver.js.map