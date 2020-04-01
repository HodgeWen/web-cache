import WebCache from '../lib/cache'

const sessionCache = WebCache.create('session')

sessionCache.on('g', (key, value, tmp) => {
  console.log(key, value, tmp)
})

if (!sessionCache.get('a')) {
  // 设置一个值并且5秒后过期
  sessionCache.set('a', Date.now(), 5)
}

// 此时打印a会有两种值的表现形式
console.log('a =>', sessionCache.get('a'), sessionCache.get(['a']))

// 设置一个定时器5秒后再打印
setTimeout(() => {
  console.log('a =>', sessionCache.get('a', '五秒后, 没有a, 这是a默认值'))
}, 5000)

// 设置一个b的值
sessionCache.set('b', 'b')
console.log('b =>', sessionCache.get('b'))
// 删除
sessionCache.remove('b')
console.log('b =>', sessionCache.get('b'))

// 设置多个值
sessionCache.set('d', 'd')
sessionCache.set('e', 'e')
sessionCache.set('f', 'f')
console.log('d, e, f =>', sessionCache.get(['d', 'e', 'f']))

// 删除多个值
sessionCache.remove(['d', 'e'])
console.log('d, e, f =>', sessionCache.get(['d', 'e', 'f']))

// 清空缓存
sessionCache.remove()
console.log('f =>', sessionCache.get('f'))

// 2秒后设置值
// 触发回调
setTimeout(() => {
  sessionCache.set('g', 'GGGG')
}, 2000)