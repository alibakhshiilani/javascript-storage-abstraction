class LocalStorageDriver {
    get<T>(key: string): T | null {
      const value = localStorage.getItem(key);
      if (!value) return null;
      try {
        return JSON.parse(value) as T;
      } catch (e) {
        return value as unknown as T;
      }
    }
  
    set<T>(key: string, value: T): void {
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
    }
  
    remove(key: string): void {
      localStorage.removeItem(key);
    }
  }
  