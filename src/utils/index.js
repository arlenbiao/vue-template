// 加
function add (...val) {
  let max = 0
  let count = 0
  for (let i = 0; i < val.length; i++) {
    const strVal = val[i].toString()
    const index = strVal.indexOf('.')
    let num = 0
    if (index > -1) {
      num = strVal.length - 1 - index
      max = num > max ? num : max
    }
  }
  for (let i = 0; i < val.length; i++) {
    count += Math.round(val[i] * Math.pow(10, max))
  }
  return count / Math.pow(10, max)
}

// 减
function sub (...val) {
  let max = 0
  let count = val[0] | 0
  for (let i = 0; i < val.length; i++) {
    const strVal = val[i].toString()
    const index = strVal.indexOf('.')
    let num = 0
    if (index > -1) {
      num = strVal.length - 1 - index
      max = num > max ? num : max
    }
  }
  for (let i = 0; i < val.length; i++) {
    count -= Math.round(val[i] * Math.pow(10, max))
  }
  return count / Math.pow(10, max)
}

// 乘
function mul (arg1, arg2) {
  let m = 0
  let s1 = arg1.toString()
  let s2 = arg2.toString()
  try { m += s1.split('.')[1].length } catch (e) {}
  try { m += s2.split('.')[1].length } catch (e) {}
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

// 除
function except (arg1, arg2) {
  let t1 = 0
  let t2 = 0
  let r1, r2
  try { t1 = arg1.toString().split('.')[1].length } catch (e) {}
  try { t2 = arg2.toString().split('.')[1].length } catch (e) {}

  r1 = Number(arg1.toString().replace('.', ''))

  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}
/**
 * 数字保留2位小数
 * @param {*} val
 * @param {*} count 默认2位小数
 */
function formatPriceToFixed (val, count = 2) {
  if (!val) return ''

  if (count <= 0) {
    count = 0
  }
  return String(Number(val).toFixed(count)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
/**
 * 处理聊天时间戳
 * @returns {*}
 */
function ChatformatTime (time) {
  time = parseInt(time / 1000)
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  // if (option) {
  //   return parseTime(time, option)
  // } else {
  //   // return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  //   return d.getMonth() + 1 + '月' + d.getDate() + '日'
  // }
  return d.getMonth() + 1 + '月' + d.getDate() + '日'
}

export default {
  add,
  sub,
  mul,
  except,
  formatPriceToFixed,
  ChatformatTime
}
