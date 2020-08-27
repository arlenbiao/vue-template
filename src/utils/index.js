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
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

// 除
function except (arg1, arg2) {
  let t1 = 0
  let t2 = 0
  let r1, r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}

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
/**
 * 平滑滚动到页面顶部
 */
function scrollToTop () {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}
/**
 * 获取本周的开始时间和结束时间
 * @param {*} timestamp
 */
function getWeekLastDay (type = 1) {
  var now = new Date()
  var nowTime = now.getTime()
  var day = now.getDay()
  var oneDayLong = 24 * 60 * 60 * 1000
  var MondayTime = nowTime - (day - 1) * oneDayLong
  var SundayTime = nowTime + (7 - day) * oneDayLong
  // 本周的开始时间  星期一
  // var monday = new Date(MondayTime)
  // // 本周的结束时间  星期天
  // var sunday = new Date(SundayTime)
  var state = ''
  if (type === 1) {
    state = new Date(MondayTime)
  } else {
    state = new Date(SundayTime)
  }
  // console.log(monday);
  // console.log(sunday);
  let tmp = new Date(new Date(new Date(state).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime()
  return tmp
}

/**
 * 时间戳倒计时
 * @param {*} i 为需要获取的天数
 * ’1’指的是1天,
 * 获取本周星期天的就传6
 */
function getWeek (i = 1) {
  // 此注释的部分是为了在页面上打印,便于观看其中’1’指的是1天,测试的时候你可以换成6
  // console.log(‘初始开始日期’,new_Dates);
  // var nowdd = new_Dates.setDate(new_Dates.getDate()-1);
  // var new_Date= new Date(nowdd)
  // console.log(‘初始结束日期’,new_Date);
  var timesStamp = new Date().getTime()
  var currenDay = new Date().getDay()
  var ymd = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7))
  var mon = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).getMonth() + 1
  if (mon < 10) {
    return ymd.getFullYear() + '年' + '0' + mon + '月' + setZero(ymd.getDate()) + '日'
  } else {
    return ymd.getFullYear() + '年' + mon + '月' + setZero(ymd.getDate()) + '日'
  }
}
function setZero (vv) {
  return Number(vv) < 10 ? '0' + vv : vv
}
export default {
  add,
  sub,
  mul,
  except,
  formatPriceToFixed,
  ChatformatTime,
  scrollToTop,
  getWeekLastDay,
  getWeek
}
