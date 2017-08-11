<!-- 排行页组件 -->

<template>
  <div class="my-rank" ref="rankRef">
    <!-- 排行榜数据 -->
    <my-scroll class="toplist" ref="scrollRef" :data="toplist">
      <ul>
        <li class="item" v-for="item in toplist" @click="selectItem(item)">
          <!-- 左图 -->
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl" @load="loadImg">
          </div>

          <!-- 右歌 -->
          <ul class="songlist">
            <!-- <h3 class="title">{{ item.topTitle }}</h3> -->
            <li class="song" v-for="(song, index) in item.songList">
              <span>{{ index + 1 }}</span>
              <span>{{ song.songname }}</span>
              <span class="singername"> - {{ song.singername }}</span>
            </li>
          </ul>
        </li>
      </ul>

      <!-- loading 组件 -->
      <div v-show="!toplist.length" class="loading-container">
        <my-loading></my-loading>
      </div>
    </my-scroll>

    <router-view></router-view>
  </div>
</template>

<script>
import MyLoading from '@/components/base/MyLoading/MyLoading'
import MyScroll from '@/components/base/MyScroll/MyScroll'
import { getRankList } from '@/api/rank.js'
import { playlistMixin } from '@/common/js/mixin.js'
import { mapMutations } from 'vuex'

export default {
  mixins: [playlistMixin],
  components: {
    MyLoading,
    MyScroll
  },
  data () {
    return {
      toplist: []
    }
  },
  props: {},
  watch: {},
  filters: {},
  methods: {
    ...mapMutations({
      setRankList: 'SET_RANKLIST'
    }),
    selectItem (item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })

      // console.log(item)
      // 写入 vuex
      this.setRankList(item)
    },
    // 当有迷你播放器时，调整滚动底部距离
    handlePlaylist(playlist) {
      let bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.rankRef.style.bottom = bottom
      this.$refs.scrollRef.refresh()
    },
    // 当首次获取到图片时，Better-scroll 重新计算
    loadImg () {
      if (!this.flag) {
        this.$refs.scrollRef.refresh()
        this.flag = true
      }
    },
    _getRankList () {
      getRankList().then((res) => {
        if (res.code === 0) {
          // console.log(res)
          this.toplist = res.data.topList
        }
      })
    }
  },
  computed: {},
  created () {
    this._getRankList()
  },
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .toplist {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;
        .song {
          @include no-wrap();
          line-height: 26px;
          .singername {
            color: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
