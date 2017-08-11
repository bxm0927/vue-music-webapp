<!-- 歌手详情页组件 -->

<template>
  <transition name="slide">
    <my-music-list :songs="songs" :title="title" :bg-image="bgImage"></my-music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer.js'
import { createSingerSong } from '@/common/js/SingerSongClass.js'
import MyMusicList from '@/components/MyMusicList/MyMusicList'

export default {
  components: {
    MyMusicList
  },
  data () {
    return {
      songs: []
    }
  },
  props: {},
  watch: {},
  methods: {
    // 获取指定歌手详情
    _getSingerDetail() {
      // 禁止直接刷新详情页（获取不到歌手 id）
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }

      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === 0) {
          // console.log(res.data.list)
          // console.log(this._formatSongs(res.data.list))
          this.songs = this._formatSongs(res.data.list)
        }
      })
    },
    // 重组 res.data.list 数据
    _formatSongs (list) {
      let result = []

      list.forEach((item) => {
        // 解构赋值
        let {musicData} = item

        if (musicData.songid && musicData.albummid) {
          result.push(createSingerSong(musicData))
        }
      })

      return result
    }
  },
  computed: {
    // vuex, 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'singer'
    ]),
    // 传入子组件
    title() {
      return this.singer.name
    },
    // 传入子组件
    bgImage() {
      return this.singer.avatar
    }
  },
  created () {
    // console.log(this.singer)
    this._getSingerDetail()
  },
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-singer-detail {
  // position: fixed;
  // z-index: 100;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // background: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
