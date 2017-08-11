<!-- 个人中心 组件 -->

<template>
  <transition name="slide">
    <div class="my-user">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>

      <div class="switches-wrapper">
        <my-switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></my-switches>
      </div>

      <div ref="playBtn" class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>

      <!-- 两个列表 -->
      <div class="list-wrapper" ref="listWrapper">
        <!-- 我的收藏 -->
        <my-scroll ref="favoriteRef" class="list-scroll" v-if="currentIndex===0" :data="favoriteList">
          <div class="list-inner">
            <my-song-list :songs="favoriteList" @select="selectSong"></my-song-list>
          </div>
        </my-scroll>

        <!-- 最近播放 -->
        <my-scroll ref="playListRef" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
          <div class="list-inner">
            <my-song-list :songs="playHistory" @select="selectSong"></my-song-list>
          </div>
        </my-scroll>
      </div>

      <div class="no-result-wrapper" v-show="noResult">
        <my-no-result></my-no-result>
      </div>
    </div>
  </transition>
</template>

<script>
import MySwitches from '@/components/base/MySwitches/MySwitches'
import MyScroll from '@/components/base/MyScroll/MyScroll'
import MySongList from '@/components/base/MySongList/MySongList'
import MyNoResult from '@/components/base/MyNoResult/MyNoResult'
import { mapActions, mapGetters } from 'vuex'
import { SingerSong } from '@/common/js/SingerSongClass.js'
import { playlistMixin } from '@/common/js/mixin.js'

export default {
  mixins: [playlistMixin],
  components: {
    MySwitches,
    MyScroll,
    MySongList,
    MyNoResult
  },
  data () {
    return {
      switches: [
        {name: '我的收藏'},
        {name: '最近播放'}
      ],
      currentIndex: 0
    }
  },
  props: {},
  watch: {},
  methods: {
    ...mapActions(['savefavoriteList', 'delfavoriteList', 'insertSong', 'randomPlay']),
    toggleFavoriteCls(song) {
      if (this._isFavorite(song)) {
        this.delfavoriteList(song)
      } else {
        this.savefavoriteList(song)
      }
    },
    getFavoriteCls(song) {
      if (this._isFavorite(song)) {
        return 'icon-favorite'
      } else {
        return 'icon-not-favorite'
      }
    },
    _isFavorite(song) {
      let index = this.favoriteList.findIndex((item) => {
        return song.id === item.id
      })

      return index > -1
    },
    switchItem(index) {
      this.currentIndex = index
    },
    selectSong(song) {
      this.insertSong(new SingerSong(song))
    },
    back() {
      this.$router.back()
    },
    random() {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
      list = list.map((song) => {
        return new SingerSong(song)
      })

      this.randomPlay({list})
    },
    // 当有迷你播放器时，调整滚动底部距离
    handlePlaylist(playlist) {
      let bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.listWrapper.style.bottom = bottom
      this.$refs.favoriteRef && this.$refs.favoriteRef.refresh()
      this.$refs.playListRef && this.$refs.playListRef.refresh()
    }
  },
  // 过滤器设计目的就是用于简单的文本转换
  filters: {},
  // 若要实现更复杂的数据变换，你应该使用计算属性
  computed: {
    ...mapGetters(['playHistory', 'favoriteList']),
    noResult() {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length
      }
      if (this.currentIndex === 1) {
        return !this.playHistory.length
      }
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

.my-user {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: $color-background;
  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter, &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .switches-wrapper {
    margin: 10px 0 30px 0;
  }
  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid  $color-text-l;
    color: $color-text-l;
    border-radius: 100px;
    font-size: 0;
    .icon-play {
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      font-size: $font-size-medium-x;
    }
    .text {
      display: inline-block;
      vertical-align: middle;
      font-size: $font-size-small;
    }
  }
  .list-wrapper {
    position: absolute;
    top: 110px;
    bottom: 0;
    width: 100%;
    .list-scroll {
      height: 100%;
      overflow: hidden;
      .list-inner {
        padding: 20px 30px
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
