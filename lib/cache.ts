import { getType } from './helper'

export class WebStorage {
  private store!: Storage

  static enabledType: Set<string> = new Set(['string', 'number', 'object', 'boolean', 'bigint'])

  constructor(storageType: 'local' | 'session') {
    if (storageType === 'local') {
      this.store = localStorage
      return
    }
    if (storageType === 'session') {
      this.store = sessionStorage
      return
    }
  }

  // 设置缓存字段
  set(key: string, value: any, exp = 0) {
    if (value === null) return this

    const valueType = typeof value
    if (!WebStorage.enabledType.has(valueType)) return this

    // exp如果为0则永不过期
    const temp = { value: null, exp: 0 }

    // 如果是简单的数据则直接存入
    temp.value = value
    temp.exp = exp ? Date.now() + exp * 1000 : 0
    this.store.setItem(key, JSON.stringify(temp))
    return this
  }

  // 获取对应的字段
  get(key: string, defaultValue?: any): any
  get(keys: string[]): any[]
  get(key: any, defaultValue = null) {
    let type = getType(key)
    if (type === 'string') {
      let stringTmp = this.store.getItem(key)

      // 如果未查到此项
      if (stringTmp === null) return defaultValue
      
      let tmp = JSON.parse(stringTmp)

      // 如果未过期
      if (tmp.exp > Date.now() || tmp.exp === 0) return tmp.value

      // 数据过期
      this.remove(key)
      return defaultValue
    }

    if (type === 'array') {
      return key.map((v: string) => this.get(v))
    }

    throw Error(`get第一个参数的类型应该是string或者array, 但传入的值是${type}类型`)
  }

  /**
   * 移除一个缓存值
   * @param key 需要移除的值的键
   */
  remove(key: string): WebStorage
  /**
   * 移除多个缓存值
   * @param keys 需要移除的值的键的数组
   */
  remove(keys: string[]): WebStorage
  remove(item: any) {
    if (item === undefined) {
      this.store.clear()
      return this
    }
    Array.isArray(item) ? item.forEach(key => this.store.removeItem(key)) : this.store.removeItem(item)
    return this
  }
}

interface Cache {
  session?: WebStorage,
  local?: WebStorage,
  create(type: 'session' | 'local'): WebStorage
}

const WebCache: Cache = {
  create(type): WebStorage {
    let cache = this[type]
    if (cache !== undefined) {
      return cache
    } else {
      this[type] = new WebStorage(type)
      return this[type] as WebStorage
    }
  }
}

export default WebCache