class CacheDriver {
    private cache: Map<string, any>;
  
    constructor() {
      this.cache = new Map();
    }
  
    get<T>(key: string): T | null {
      return this.cache.get(key) || null;
    }
  
    set<T>(key: string, value: T): void {
      this.cache.set(key, value);
    }
  
    remove(key: string): void {
      this.cache.delete(key);
    }
  }
  