"use strict";
class CacheDriver {
    constructor() {
        this.cache = new Map();
    }
    get(key) {
        return this.cache.get(key) || null;
    }
    set(key, value) {
        this.cache.set(key, value);
    }
    remove(key) {
        this.cache.delete(key);
    }
}
//# sourceMappingURL=CacheDriver.js.map