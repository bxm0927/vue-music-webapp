<!-- 搜索框组件 -->

<template>
  <div class="my-search-box">
    <i class="icon-search"></i>
    <input type="text" class="box" ref="queryRef" v-model="query" :placeholder="placeholder">
    <i class="icon-dismiss" v-show="query" @click="clearQuery"></i>
  </div>
</template>

<script>
import { myDOM } from '@/common/js/myutils.js'

export default {
  components: {},
  data () {
    return {
      query: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  watch: {},
  filters: {},
  methods: {
    // 给父亲用的，让输入框失去焦点，避免滚动搜索结果时移动端键盘遮挡
    blur() {
      this.$refs.queryRef.blur()
    },
    // 给父亲用的，传进搜索框的值
    // this.$refs.searchBoxRef.getQuery(k)
    getQuery(k) {
      this.query = k
    },
    clearQuery() {
      this.query = ''
    }
  },
  computed: {},
  created () {
    // 节流
    this.$watch('query', myDOM.debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 300))
  },
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: $color-highlight-background;
  border-radius: 6px;
  .icon-search {
    font-size: 24px;
    color: $color-background;
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    border: 0;
    outline: none;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-background;
  }
}
</style>
