export declare class WebStorage {
    private store;
    static enabledType: Set<string>;
    constructor(storageType: 'local' | 'session');
    set(key: string, value: any, exp?: number): this;
    get(key: string, defaultValue?: any): any;
    get(keys: string[]): any[];
    /**
     * 移除一个缓存值
     * @param key 需要移除的值的键
     */
    remove(key: string): WebStorage;
    /**
     * 移除多个缓存值
     * @param keys 需要移除的值的键的数组
     */
    remove(keys: string[]): WebStorage;
}
interface Cache {
    session?: WebStorage;
    local?: WebStorage;
    create(type: 'session' | 'local'): WebStorage;
}
declare const WebCache: Cache;
export default WebCache;
