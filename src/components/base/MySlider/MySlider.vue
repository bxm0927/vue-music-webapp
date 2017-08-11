<!-- better-scroll 轮播图组件 -->

<template>
  <div class="my-slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <!-- 轮播点 -->
    <div class="dots">
      <span v-for="(dot, index) in dots" :class="{ active: currentDotsIndex === index }" class="dot"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { myDOM } from '@/common/js/myutils.js'

export default {
  components: {},
  data () {
    return {
      dots: [],
      currentDotsIndex: 0
    }
  },
  props: {
    // 是否循环播放
    loop: {
      type: Boolean,
      default: true
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 轮播延时
    delay: {
      type: Number,
      default: 3000
    }
  },
  methods: {
    // 轮播图(sliderGroup)宽度
    _setSliderWidth (isResize) {
      // 拿到传过来的图片
      this.children = this.$refs.sliderGroup.children
      // console.log(this.children) // (5) [div, div, div, div, div]

      // 拿到父元素（slider）宽度
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth

      // 动态添加 class、width
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        myDOM.addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }

      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 初始化轮播图
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })

      this.slider.on('scrollEnd', () => {
        let nowIndex = this.slider.getCurrentPage().pageX
        // 循环模式下 -1
        if (this.loop) {
          nowIndex -= 1
        }
        this.currentDotsIndex = nowIndex

        // 重置自动轮播定时器
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._initPlay()
        }
      })
    },
    // 初始化轮播点
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    // 自动播放
    _initPlay () {
      let nextIndex = this.currentDotsIndex + 1
      if (this.loop) {
        nextIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(nextIndex, 0, 400)
      }, this.delay)
    }
  },
  created () {},
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()

      if (this.autoPlay) {
        this._initPlay()
      }

      // 当窗口尺寸改变时，重新计算轮播宽度
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    }, 20)
  },
  destroyed () {
    // 良好的习惯：销毁定时器
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
