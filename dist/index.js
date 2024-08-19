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
Object.defineProperty(exports, "__esModule", { value: true });
const LocalStorageDriver_1 = require("./LocalStorageDriver");
const IndexedDBDriver_1 = require("./IndexedDBDriver");
const CacheDriver_1 = require("./CacheDriver");
const StorageManager_1 = require("./StorageManager");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const localStorageDriver = new LocalStorageDriver_1.LocalStorageDriver();
        const localStorageManager = new StorageManager_1.StorageManager(localStorageDriver);
        localStorageManager.set('user', { name: 'Nadine', age: 30 });
        const user = localStorageManager.get('user');
        console.log('User from LocalStorage:', user);
        localStorageManager.persistKey('user');
        localStorageManager.remove('user');
        const indexedDBDriver = new IndexedDBDriver_1.IndexedDBDriver();
        const indexedDBManager = new StorageManager_1.StorageManager(indexedDBDriver);
        yield indexedDBManager.set('settings', { theme: 'dark', notifications: true });
        const settings = yield indexedDBManager.get('settings');
        console.log('Settings from IndexedDB:', settings);
        const cacheDriver = new CacheDriver_1.CacheDriver();
        const cacheManager = new StorageManager_1.StorageManager(cacheDriver);
        cacheManager.set('session', 'active');
        const session = cacheManager.get('session');
        console.log('Session from Cache:', session);
        cacheManager.onChange((key, action, value) => {
            console.log(`CacheManager Change - Key: ${key}, Action: ${action}, Value:`, value);
        });
        cacheManager.set('session', 'inactive');
        cacheManager.removeChangeListener((key, action, value) => {
            console.log(`CacheManager Change - Key: ${key}, Action: ${action}, Value:`, value);
        });
    });
}
main();
//# sourceMappingURL=index.js.map