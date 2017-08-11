import jsonp from '@/common/js/jsonp'
import axios from 'axios'
import { commonParams, opts } from '@/api/common-query.js'

/**
 * jsonp 抓取推荐页轮播图数据
 * 接口：https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
 */
export function getRecommend() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, opts)
}

/**
 * axios 抓取推荐页列表数据
 * 接口：https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg
 * 接口提供方使用了 referer:https://y.qq.com/portal/playlist.html
 * axios 结合 node.js 代理后端请求
 */
export function getList() {
  let url = '/api/getList'
  let data = Object.assign({}, commonParams, {
    rnd: Math.random(),
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })
  return axios.get(url, {
    params: data
  })
  .then(function(response) {
    return Promise.resolve(response.data)
  })
  .catch(function(error) {
    console.log(error)
  })
}

/**
 * jsonp 抓取推荐页歌单数据
 * 接口：https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg
 * 提供方：https://y.qq.com/n/yqq/playlist/1471714611.html#
 */
export function getSongList(disstid) {
  let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  let data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })
  let opts = Object.assign({}, opts, {
    param: 'jsonpCallback',
    name: 'playlistinfoCallback'
  })
  return jsonp(url, data, opts)
}
