# Vue2.5项目基础模版

· 执行命令行
```
npm install
```

## 默认安装库

- axios 

- babel-polyfill

- js-cookie 

- less 

- less-loader 

- lodash

- vue-router

### 状态管理vuex

```
npm install vuex --save

import Vuex from 'vuex'

Vue.use(Vuex)
```

## 第三方UI库

### Vant

```
yarn add vant

import Vant from 'vant';

import 'vant/lib/index.css';

Vue.use(Vant);
```

### Element-ui
```
npm i element-ui -S

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
```
### iView-ui
```
npm install view-design --save

import ViewUI from 'view-design';

import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
```
### Ant-design
```
npm install ant-design-vue --save

import ant from 'ant-design-vue'

import 'ant-design-vue/dist/antd.less'

Vue.use(ant)
```

## 工具积累库(src/utils)

- index.js

    - add 加的精度

    - sub 减的精度

    - mul 乘的精度

    - except 除的精度

    - formatPriceToFixed 数字保留2位小数

    - ChatformatTime 处理聊天时间戳

- RegExp.js 各种正则表达式

    - mobile   手机号

    - email    电子邮箱
    
    - password 密码【6-20位】
    
    - integer  正整数【不包含0】
    
    - money    金钱
    
    - TINumber 纳税识别号
    
    - IDCard   身份证
    
    - userName 账户名称【汉字、字母、数字、“-”、“_”的组合】
    
    - URL      URL
    
    - TEL      固定电话

- Foundation.js 

    - unixToDate    将unix时间戳转换为指定格式

    - dateToUnix    将时间转unix时间戳

    - deepClone     对一个对象进行深拷贝

    - formatPrice   货币格式化

    - secrecyMobile 手机号隐私保护

    - randomString  随机生成指定长度的字符串

    - countTimeDown 秒数的倒计时

    - theNextDayTime 计算当前时间到第二天0点的倒计时[秒]
