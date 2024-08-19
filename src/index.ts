import { LocalStorageDriver } from './LocalStorageDriver';
import { IndexedDBDriver } from './IndexedDBDriver';
import { CacheDriver } from './CacheDriver';
import { StorageManager } from './StorageManager';

async function main() {
    const localStorageDriver = new LocalStorageDriver();
    const localStorageManager = new StorageManager(localStorageDriver);
  
    localStorageManager.set('user', { name: 'Nadine', age: 30 });
    const user = localStorageManager.get<{ name: string; age: number }>('user');
    console.log('User from LocalStorage:', user);
  
    localStorageManager.persistKey('user');
  
    localStorageManager.remove('user');
  
    const indexedDBDriver = new IndexedDBDriver();
    const indexedDBManager = new StorageManager(indexedDBDriver);
  
    await indexedDBManager.set('settings', { theme: 'dark', notifications: true });
    const settings = await indexedDBManager.get<{ theme: string; notifications: boolean }>('settings');
    console.log('Settings from IndexedDB:', settings);
  
    const cacheDriver = new CacheDriver();
    const cacheManager = new StorageManager(cacheDriver);
  
    cacheManager.set('session', 'active');
    const session = cacheManager.get<string>('session');
    console.log('Session from Cache:', session);
  
    cacheManager.onChange((key, action, value) => {
      console.log(`CacheManager Change - Key: ${key}, Action: ${action}, Value:`, value);
    });
  
    cacheManager.set('session', 'inactive');
  
    cacheManager.removeChangeListener((key, action, value) => {
      console.log(`CacheManager Change - Key: ${key}, Action: ${action}, Value:`, value);
    });
  }
  
  main();
  