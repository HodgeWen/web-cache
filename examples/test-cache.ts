import WebCache from '../lib/cache'
const body = document.body
const log = function(...message: any[]) {
  console.log(...message)

  body.innerText = body.innerText + '▶ ' + message.map(v => {
    return typeof v === 'object' ? JSON.stringify(v) : v
  }).join(' ') + '\n'
}

const sessionCache = WebCache.create('session')

// ----------------------------------------------------------------------------------------

sessionCache.on('g', (key, value, tmp) => {
  log(key, value, tmp)
})

if (!sessionCache.get<number>('a')) {
  // 设置一个值并且5秒后过期
  sessionCache.set('a', Date.now(), 5)
}

// 此时打印a会有两种值的表现形式
log('a =>', sessionCache.get('a'), sessionCache.get(['a']))

// 设置一个定时器5秒后再打印
setTimeout(() => {
  log('a =>', sessionCache.get('a', '五秒后, 没有a, 这是a默认值'))
}, 5000)

// 设置一个b的值
sessionCache.set('b', 'b')
log('b =>', sessionCache.get('b'))
// 删除
sessionCache.remove('b')
log('b =>', sessionCache.get('b'))

// 设置多个值
sessionCache.set('d', 'd')
sessionCache.set('e', 'e')
sessionCache.set('f', 'f')
log('d, e, f =>', sessionCache.get(['d', 'e', 'f']))

// 删除多个值
sessionCache.remove(['d', 'e'])
log('d, e, f =>', sessionCache.get(['d', 'e', 'f']))

// 清空缓存
sessionCache.remove()
log('f =>', sessionCache.get('f'))

// 2秒后设置值
// 触发回调
setTimeout(() => {
  sessionCache.set('g', 'GGGG')
}, 2000)