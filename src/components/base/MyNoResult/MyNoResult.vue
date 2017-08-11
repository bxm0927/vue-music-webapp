<!-- 无返回数据组件 -->

<template>
  <div class="my-no-sesult">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{ title }}</p>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      default: '抱歉，暂无数据'
    }
  },
  watch: {},
  filters: {},
  methods: {},
  computed: {},
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-no-sesult {
  text-align: center;
  .no-result-icon {
    width: 86px;
    height: 90px;
    margin: 0 auto;
    @include bg-image('no-result');
    background-size: 86px 90px;
  }
  .no-result-text {
    margin-top: 30px;
    font-size: $font-size-medium;
    color: $color-text-d;
  }
}
</style>
