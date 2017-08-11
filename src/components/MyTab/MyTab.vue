<template>
  <div class="my-tab">
    <router-link tag="div" class="tab-item" :to="{ name: 'recommend' }">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'singer' }">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'rank' }">
      <span class="tab-link">排行
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'search' }">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';

.my-tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
      padding-bottom: 5px;
      color: $color-text-l;
    }
    &.router-link-active {
      .tab-link {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>
