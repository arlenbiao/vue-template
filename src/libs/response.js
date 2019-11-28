function setRem () {
  let clientWidth = document.documentElement.clientWidth || window.innerWidth
  if (clientWidth >= 750) {
    clientWidth = 750
  }
  if (clientWidth <= 320) {
    clientWidth = 320
  }
  document.documentElement.style.fontSize = clientWidth / 7.5 + 'px'
}

// 初始化
setRem()

// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
