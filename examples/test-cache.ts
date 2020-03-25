import WebCache from '../lib/cache'

const sessionCahce = WebCache.create('session')

if (!sessionCahce.get('a')) {
  // 设置一个值并且5秒后过期
  sessionCahce.set('a', Date.now(), 5)
}

// 此时打印a会有两种值的表现形式
console.log('a =>', sessionCahce.get('a'), sessionCahce.get(['a']))

// 设置一个定时器5秒后再打印
setTimeout(() => {
  console.log('a =>', sessionCahce.get('a', '五秒后, 没有a, 这是a默认值'))
}, 5000)

// 设置一个b的值
sessionCahce.set('b', 'b')
console.log('b =>', sessionCahce.get('b'))
// 删除
sessionCahce.remove('b')
console.log('b =>', sessionCahce.get('b'))

// 设置多个值
sessionCahce.set('d', 'd')
sessionCahce.set('e', 'e')
sessionCahce.set('f', 'f')
console.log('d, e, f =>', sessionCahce.get(['d', 'e', 'f']))

// 删除多个值
sessionCahce.remove(['d', 'e'])
console.log('d, e, f =>', sessionCahce.get(['d', 'e', 'f']))