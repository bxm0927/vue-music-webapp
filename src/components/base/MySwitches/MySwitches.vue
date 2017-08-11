<!--
开关切换 组件

<my-switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></my-switches>

// 切换开关文案
switches: [
  {name: '最近播放'},
  {name: '搜索历史'}
],
// 当前切换开关
currentIndex: 0

switchItem(index) {
  this.currentIndex = index
}
 -->

<template>
  <ul class="my-switches">
    <li class="switch-item" :class="{'active':currentIndex === index}"
        v-for="(item, index) in switches" @click="switchItem(index)">
      <span>{{ item.name }} </span>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  props: {
    switches: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {},
  methods: {
    // 开关被切换了，通知父组件
    switchItem(index) {
      this.$emit('switch', index)
    }
  },
  // 过滤器设计目的就是用于简单的文本转换
  filters: {},
  // 若要实现更复杂的数据变换，你应该使用计算属性
  computed: {},
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-switches {
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid $color-highlight-background;
  border-radius: 5px;
  .switch-item {
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-text-d;
    &.active {
      background: $color-highlight-background;
      color: $color-text;
    }
  }
}
</style>
