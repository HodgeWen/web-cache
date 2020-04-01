# web网页存储

## 需求
1.具有过期时间
2.可以取默认值

``` es6

import WebCache from 'web-cache'

// 新建一个
const sessionCache = WebCache.create('session')

if (!sessionCache.get('a')) {
  // 设置一个值并且5秒后过期
  sessionCache.set('a', Date.now(), 5)
}

// 此时打印a会有两种值的表现形式
console.log('a =>', sessionCache.get('a'), sessionCache.get(['a']))
// 两种方式在控制台都会返回 Date.now() 的值

// 设置一个定时器5秒后再打印
setTimeout(() => {
  console.log('a =>', sessionCache.get('a', '五秒后, 没有a, 这是a默认值'))
  // 控制台返回 => 五秒后, 没有a, 这是a默认值
}, 5000)

// 设置一个b的值
sessionCache.set('b', 'b')
console.log('b =>', sessionCache.get('b'))
// 返回 b => b

// 删除
sessionCache.remove('b')
console.log('b =>', sessionCache.get('b'))
// 返回 b => null

// 设置多个值
sessionCache.set('d', 'd')
sessionCache.set('e', 'e')
sessionCache.set('f', 'f')
console.log('d, e, f =>', sessionCache.get(['d', 'e', 'f']))
// 返回 d, e, f => ['d', 'e', 'f']

// 删除多个值
sessionCache.remove(['d', 'e'])
console.log('d, e, f =>', sessionCache.get(['d', 'e', 'f']))
// 返回 d, e, f => [null, null, 'f']

// 删除所有值
sessionCache.remove()
console.log('f =>', sessionCache.get('f'))
// 返回 f => null

// 设置值设置时的回调, 可为同一个值设置多个
sessionCache.on('g', (key, value, tmp) => {
  console.log('第一个回调出发', key, value, tmp)
  // 在值被设置时触发
})
sessionCache.on('g', (key, value, tmp) => {
  console.log('第二个回调触发', key, value, tmp)
  // 在值被设置时触发
})

// 2秒后设置值
setTimeout(() => {
  sessionCache.set('g', 'GGGG')
}, 2000)

// 移除值的回调
sessionCache.off('g')

```