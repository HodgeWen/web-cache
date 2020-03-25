type Type = 'string' | 'boolen' | 'array' | 'object' | 'function' | 'number' | 'symbol' | 'bigint'

export function getType(val: any): Type {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase() as Type
}