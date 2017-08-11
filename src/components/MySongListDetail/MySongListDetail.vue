<!-- 推荐页：歌单详情组件 -->

<template>
  <transition name="slide">
    <my-music-list class="my-song-list-detail" :songs="songs" :title="title" :bg-image="bgImage"></my-music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import MyMusicList from '@/components/MyMusicList/MyMusicList'
import { getSongList } from '@/api/recommend.js'
import { createSingerSong } from '@/common/js/SingerSongClass.js'

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
  filters: {},
  methods: {
    // 获取歌单数据
    _getSongList () {
      // 禁止直接刷新详情页（获取不到歌单 id）
      if (!this.songlist.dissid) {
        this.$router.push('/recommend')
        return
      }

      getSongList(this.songlist.dissid).then((res) => {
        if (res.code === 0) {
          // console.log(res.cdlist[0].songlist)
          this.songs = this._formatSongs(res.cdlist[0].songlist)
        }
      })
    },
    // 重组 res.cdlist[0].songlist 数据
    _formatSongs (list) {
      let result = []

      list.forEach((item) => {
        if (item.songid && item.albummid) {
          result.push(createSingerSong(item))
        }
      })

      return result
    }
  },
  computed: {
    // vuex, 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters(['songlist']),
    // 传入子组件
    title () {
      return this.songlist.dissname
    },
    // 传入子组件
    bgImage () {
      return this.songlist.imgurl
    }
  },
  created () {
    this._getSongList()
  },
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-song-list-detail {}

.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
