<!-- 推荐页组件 -->

<template>
  <div class="my-recommend" ref="recommendRef">
    <!-- better-scroll 滚动组件，当请求到 lists 时才渲染 -->
    <my-scroll ref="scroll" :data="lists" class="recommend-content">
      <div>
        <!-- 轮播图，当请求到 recommends 时才渲染 -->
        <div v-if="recommends.length" class="slide-wrapper">
          <my-slider>
            <div v-for="recommend in recommends">
              <a :href="recommend.linkUrl">
                <img @load="loadImg" :src="recommend.picUrl" class="needsclick">
              </a>
            </div>
          </my-slider>
        </div>

        <!-- 歌单推荐列表 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item in lists" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <p v-html="item.creator.name" class="name"></p>
                <p v-html="item.dissname" class="desc"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- loading 组件 -->
      <div v-show="!lists.length" class="loading-container">
        <my-loading></my-loading>
      </div>
    </my-scroll>

    <router-view></router-view>
  </div>
</template>

<script>
import { getRecommend, getList } from '@/api/recommend.js'
import MySlider from '@/components/base/MySlider/MySlider'
import MyScroll from '@/components/base/MyScroll/MyScroll'
import MyLoading from '@/components/base/MyLoading/MyLoading'
import { playlistMixin } from '@/common/js/mixin.js'
import { mapMutations } from 'vuex'

export default {
  mixins: [playlistMixin],
  components: {
    MySlider,
    MyScroll,
    MyLoading
  },
  data () {
    return {
      recommends: [],
      lists: []
    }
  },
  created () {
    this._getRecommend()
    setTimeout(() => {
      this._getList()
    }, 1000)
  },
  methods: {
    ...mapMutations({
      setSonglist: 'SET_SONGLIST'
    }),
    // 子路由跳转
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })

      // 写入 vuex
      // console.log(item)
      this.setSonglist(item)
    },
    // 当有迷你播放器时，调整滚动底部距离
    handlePlaylist(playlist) {
      let bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommendRef.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    // 获取轮播图数据
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === 0) {
          // console.log(res)
          this.recommends = res.data.slider
        }
      })
    },
    // 获取歌单列表数据
    _getList () {
      getList().then((res) => {
        if (res.code === 0) {
          // console.log(res)
          this.lists = res.data.list
        }
      })
    },
    // 当首次获取到图片时，Better-scroll 重新计算
    loadImg () {
      if (!this.flag) {
        this.$refs.scroll.refresh()
        this.flag = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slide-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .desc {
            color: $color-text-d;
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
