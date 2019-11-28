// 判断输入框是否为空
export function isEmpty (obj) {
  if (typeof obj === 'undefined' || obj == null || obj === '') {
    return true
  } else {
    return false
  }
}
