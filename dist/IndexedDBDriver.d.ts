declare class IndexedDBDriver {
    private dbName;
    private storeName;
    private db;
    constructor(dbName?: string, storeName?: string);
    private init;
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
}
