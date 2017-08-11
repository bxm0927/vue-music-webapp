<!--
圆形进度条组件
http://www.runoob.com/svg/svg-example.html
 -->

<template>
  <div class="my-progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" cx="50" cy="50" r="50" fill="transparent"/>
      <circle class="progress-bar" cx="50" cy="50" r="50" fill="transparent" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset"/>
    </svg>

    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      dasharray: Math.PI * 100
    }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    },
    radius: {
      type: Number,
      default: 32
    }
  },
  watch: {},
  filters: {},
  methods: {},
  computed: {
    dashoffset() {
      return (1 - this.percent) * this.dasharray
    }
  },
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-progress-circle {
  position: relative;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: $color-theme-d;
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $color-theme;
    }
  }
}
</style>
