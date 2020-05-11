declare type Callback<T = any> = (key: string, value?: T, temp?: {
    value: T;
    exp: number;
}) => void;
export declare class WebStorage {
    private store;
    static enabledType: Set<string>;
    callbacks: Record<string, Callback[]>;
    constructor(storageType: 'local' | 'session');
    /**
     * 往缓存里添加单条记录
     * @param key 单个值的键
     * @param value 单个值
     * @param exp 单个值的过期时间
     */
    set<T>(key: string, value: T, exp?: number): WebStorage;
    get<T = any>(key: string, defaultValue?: T): T | null;
    get<T = any[]>(keys: string[]): T;
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
    /**
     * 清空缓存
     */
    remove(): WebStorage;
    /**
     * 添加一个值改动的回调
     * @param key 键
     * @param callback 回调函数
     */
    on(key: string, callback: Callback): void;
    /**
     * 移除多个回调
     * @param keys 需要移除的回调的字符串数组
     */
    off(keys: string[]): void;
    /**
     * 移除单个回调
     * @param key 需要移除的记录的键
     */
    off(key: string): void;
    /**
     * 移除所有回调
     */
    off(): void;
}
interface Cache {
    session?: WebStorage;
    local?: WebStorage;
    create(type: 'session' | 'local'): WebStorage;
}
declare const WebCache: Cache;
export default WebCache;
