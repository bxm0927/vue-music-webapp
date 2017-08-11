<!-- 歌手页组件 -->

<template>
  <div class="my-singer" ref="singerRef">
    <my-phone-list ref="listRef" :data="singers" @select="selectSinger"></my-phone-list>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer.js'
import { createSinger } from '@/common/js/SingerClass.js'
import MyPhoneList from '@/components/base/MyPhoneList/MyPhoneList'
import { mapMutations } from 'vuex'
import { playlistMixin } from '@/common/js/mixin.js'

const HOT_TITLE = '热门'
const HTO_NUM = 10

export default {
  mixins: [playlistMixin],
  components: {
    MyPhoneList
  },
  data () {
    return {
      singers: []
    }
  },
  props: {},
  watch: {},
  methods: {
    // 当有迷你播放器时，调整滚动底部距离
    handlePlaylist(playlist) {
      let bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singerRef.style.bottom = bottom
      this.$refs.listRef.refresh()
    },
    // 子路由分配
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })

      this.setSinger(singer)
    },
    // 获取歌手列表数据
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === 0) {
          // console.log(res.data.list)
          // console.log(this._formatSingers(res.data.list))
          this.singers = this._formatSingers(res.data.list)
        }
      })
    },
    // 重组 res.data.list 数据
    _formatSingers (list) {
      // 热门歌手
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      }

      // 填充歌手数据
      list.forEach((item, index) => {
        // 填充热门歌手数据
        if (index < HTO_NUM) {
          map.hot.items.push(createSinger(item))
        }

        // 填充 a-z 字母
        let key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }

        // 填充对应字母歌手数据
        map[key].items.push(createSinger(item))
      })

      // 得到有序列表
      let hot = []
      let others = []

      for (let key in map) {
        let value = map[key]
        if (value.title.match(/[a-zA-Z]/)) {
          others.push(value)
        } else if (value.title === HOT_TITLE) {
          hot.push(value)
        }
      }

      others.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      // console.log(hot.concat(others))
      return hot.concat(others)
    },
    // vuex
    ...mapMutations({
      'setSinger': 'SET_SINGER'
    })
  },
  created () {
    this._getSingerList()
  },
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
