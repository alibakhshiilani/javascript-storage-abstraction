"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class IndexedDBDriver {
    constructor(dbName = 'appDB', storeName = 'keyValuePairs') {
        this.db = null;
        this.dbName = dbName;
        this.storeName = storeName;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(this.dbName, 1);
                request.onupgradeneeded = (event) => {
                    this.db = event.target.result;
                    this.db.createObjectStore(this.storeName, { keyPath: 'key' });
                };
                request.onsuccess = (event) => {
                    this.db = event.target.result;
                    resolve();
                };
                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.get(key);
                request.onsuccess = () => {
                    resolve(request.result ? request.result.value : null);
                };
                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.put({ key, value });
                request.onsuccess = () => resolve();
                request.onerror = (event) => reject(event.target.error);
            });
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.delete(key);
                request.onsuccess = () => resolve();
                request.onerror = (event) => reject(event.target.error);
            });
        });
    }
}
//# sourceMappingURL=IndexedDBDriver.js.map