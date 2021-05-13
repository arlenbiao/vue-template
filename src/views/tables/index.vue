<template>
  <div class="tables">
    <div class="containers">
      <div class="left-box">
        <div class="row" :class="ri===0?'first-row':''" v-for="(ritem, ri) in array" :key="ri">
          <div class="date-week" v-if="ri===0">
            <p><b>姓名</b> <em>日期</em></p>
          </div>
          <div class="date-week" v-if="ri!==0">{{ritem.userName}}</div>
        </div>
      </div>
      <div class="right-box">
        <div class="row" :class="ri===0?'first-row':''" v-for="(ritem, ri) in array" :key="ri">
          <div class="date-week" v-if="ri===0">
            <p><b>姓名</b> <em>日期</em></p>
          </div>
          <div class="date-week" v-if="ri!==0">{{ritem.userName}}</div>
          <div class="col" v-for="(citem, ci) in ritem.cols" :key="ci">
            <span v-if="ri!==0" :class="[toClass(citem.status?citem.status:3)]">
              {{(citem.status?citem.status:3)|toTxt }}</span>
            <span v-else> {{citem.riqi | toDay}}<br>({{getWeek(citem.riqi)}})</span>
          </div>
        </div>
      </div>
    </div>
    <div class="no-data" v-if="array.length===0">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: 'tables',
  data () {
    return {
      array: [{
        cols: []
      }],
      list: [],
      backList: [],
      //  状态 3 正常上班 1 请假  4 调休  2 出差
      isLoad: true
    }
  },

  mounted () {
    this.structureData()
    window.addEventListener('scroll', this.handleScroll, true)
  },
  filters: {
    toDay (day) {
      let time = day.split('/')[2]
      return time
    },
    toTxt (status) {
      let str = ''
      switch (status) {
        case 1:
          str = '请假'
          break
        case 2:
          str = '出差'
          break
        case 3:
          str = '正常'
          break
        case 4:
          str = '假期'
          break
      }
      return str
    }
  },
  methods: {
    handleScroll () {
      let w = document.querySelector('.right-box').clientWidth
      let scrollTop = document.querySelector('.right-box').scrollLeft
      let scrollWidth = document.querySelector('.right-box').scrollWidth
      if (scrollTop + w > scrollWidth - 20 && this.isLoad) {
        this.isLoad = false
        console.log('加载更多')
        // 延时2s  模拟加载
        setTimeout(() => {
          this.isLoad = true
          console.log('调用请求加载完成')
        }, 2000)
      }
    },
    getWeek (dateString) {
      var dateArray = dateString.split('/')
      var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2])
      return '周' + '日一二三四五六'.charAt(date.getDay())
    },
    toClass (status) {
      let str = ''
      switch (status) {
        case 1:
          str = 'color1'
          break
        case 2:
          str = 'color2'
          break
        case 3:
          str = ''
          break
        case 4:
          str = 'color3'
          break
      }
      return str
    },
    structureData () {
      // 首先生成行第一行 名称
      let Allroom = this.unique(this.backList)
      for (let i = 0; i < Allroom.length; i++) {
        this.array.push({
          userName: Allroom[i].userName,
          userId: Allroom[i].userId,
          cols: []
        })
      }
      // 新建临时数组变量
      let dateArray = this.backList.map(item => {
        item.scheduleDate = item.scheduleDate.replace(/-/g, '/')
        return item.scheduleDate
      })
      dateArray = [...new Set(dateArray)]
      dateArray = dateArray.sort()
      // 根据日期生成列数据  --先循环原始数据
      // 现在是根据行数据渲染，所以
      // 1、先循环得到本周所有日期，放入第一行数据内
      for (let c = 0; c < dateArray.length; c++) {
        this.array[0].cols.push({
          riqi: dateArray[c]
        })
      }
      // 2、生成列数据
      let array1 = dateArray
      for (let a = 0; a < Allroom.length; a++) {
        for (let b = 0; b < array1.length; b++) {
          this.array[a + 1].cols.push({
            riqi: array1[b]
          })
        }
      }
      for (let d = 0; d < this.backList.length; d++) {
        for (let e = 0; e < this.array.length; e++) {
          for (let f = 0; f < this.array[e].cols.length; f++) {
            debugger
            let time1 = ((new Date(this.array[e].cols[f].riqi).getTime()) / 1000) === ((new Date(this.backList[d].scheduleDate).getTime()) / 1000)
            if (this.backList[d].userId === this.array[e].userId && time1) {
              this.array[e].cols[f] = {
                ...this.array[e].cols[f],
                status: this.backList[d].scheduleTypeCode
              }
            }
          }
        }
      }
    },
    getWeekDay () {
      let _this = this
      let dateString = _this.formatDate(new Date()) // 当天的日期，例如2020-2-28
      let presentDate = new Date(dateString)
      let today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7
      return Array.from(new Array(7), function (val, index) {
        return _this.formatDate(new Date(presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000))
      })
    },
    formatDate (date) {
      date = new Date(date)
      let myyear = date.getFullYear()
      let mymonth = date.getMonth() + 1
      let myweekday = date.getDate()
      mymonth = mymonth < 10 ? (mymonth = '0' + mymonth) : mymonth
      myweekday = myweekday < 10 ? myweekday = '0' + myweekday : myweekday
      return `${myyear}/${mymonth}/${myweekday}`
    },
    unique (arr1) {
      const res = new Map()
      return arr1.filter((a) => !res.has(a.userId) && res.set(a.userId, 1))
    },
    isEmpty (obj) {
      if (typeof obj === 'undefined' || obj == null || obj === '') {
        return true
      } else {
        return false
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .color1 {
    color: red
  }

  .color2 {
    color: burlywood
  }

  .color3 {
    color: pink
  }

  .containers {
    font-size: 14px;
    background-color: #fff;
    overflow-x: auto;
    width: 100%;
    position: relative;
    display: flex;

    .row {
      display: flex;
      height: 60px;
      position: relative;

      .date-week {
        min-width: 80px;
        display: flex;
        align-items: center;
        position: relative;
        justify-content: center;
        min-height: 60px;

        &::before {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          content: '';
          height: 1px;
          background-color: #ddd;
        }

        &::after {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 1px;
          content: '';
          height: 100%;
          background-color: #ddd;
        }
      }

      .col {
        width: 70px;
        min-width: 70px;
        min-height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        p {
          padding: px2rem(5) px2rem(8);
          box-sizing: border-box;
          text-align: left;
        }

        &::before {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          content: '';
          height: 1px;
          background-color: #ddd;
        }

        &::after {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 1px;
          content: '';
          height: 100%;
          background-color: #ddd;
        }
      }
    }

    .first-row {
      height: 40px;
      display: flex;
      align-items: center;

      span {
        text-align: center;
      }

      .col {
        justify-content: center;
        height: 60px;
        max-height: 60px;
        min-height: 60px;

        p {
          margin: auto;
        }
      }

      .date-week {
        height: 60px;

        p {
          position: relative;
          display: flex;
          justify-content: space-around;
          width: 100%;
          height: inherit;
          align-items: center;

          b {
            flex: 1;
            display: inline-block;
            font-style: normal;
            font-weight: unset;
            position: relative;
            height: 70%;
            display: flex;
            align-items: flex-end;
            justify-content: center;

            &::after {
              position: absolute;
              top: 26px;
              left: 0;
              content: '';
              width: 200%;
              height: 1px;
              background: #ddd;
              -webkit-transform: skewY(31deg);
              -moz-transform: skewY(31deg);
              -ms-transform: skewY(31deg);
              -o-transform: skewY(31deg);
              transform: skewY(31deg)
            }
          }

          em {
            display: inline-block;
            flex: 1;
            font-style: normal;
            text-align: center;
          }
        }

      }
    }

    .left-box {
      overflow: hidden;
      width: 80px;
      background: #FFF;

    }

    .right-box {
      flex: 1;
      max-width: calc(100% - 80px);
      overflow-x: auto;

      .row {
        .date-week {
          overflow: hidden;
          width: 0 !important;
          min-width: 0px;
        }
      }
    }
  }

  .no-data {
    padding: 15px 0;
    box-sizing: border-box;
    background-color: #FFF;
    font-size: 26px;
  }

</style>
