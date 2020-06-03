// 判断输入框是否为空
export function isEmpty(obj) {
  if (typeof obj === 'undefined' || obj == null || obj === '') {
    return true
  } else {
    return false
  }
}
/**
 * 图片懒加载
 * @param {*} className 传入类名
 */
export function lazyLoadImg(className) {
  let imgList = [],
    delay,
    time = 200,
    offset = 50;

  function _delay() {
    //函数防抖
    clearTimeout(delay);
    delay = setTimeout(() => {
      _loadImg();
    }, time);
  }

  function _loadImg() {
    //执行图片加载
    for (let i = 0; i < imgList.length; i++) {
      if (_isShow(imgList[i])) {
        imgList[i].src = imgList[i].getAttribute("data-src");
        imgList.splice(i, 1);
      }
    }
  }

  function _isShow(el) {
    //判断img是否出现在可视窗口
    let coords = el.getBoundingClientRect();
    return (
      (coords.left >= 0 && coords.left >= 0 && coords.top) <=
      (document.documentElement.clientHeight || window.innerHeight) +
      parseInt(offset)
    );
  }

  function imgLoad(selector) {
    //获取所有需要实现懒加载图片对象引用并设置window监听事件scroll
    // selector = selector || ".imgLazyLoad";
    let nodes = document.querySelectorAll(selector);
    imgList = Array.apply(null, nodes);
    window.addEventListener("scroll", _delay, false);
  }
  imgLoad(className);
}
