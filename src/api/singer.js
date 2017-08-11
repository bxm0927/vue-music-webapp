import jsonp from '@/common/js/jsonp'
import { commonParams, opts } from '@/api/common-query.js'

/**
 * jsonp 抓取歌手页数据
 * 接口：https://c.y.qq.com/v8/fcg-bin/v8.fcg
 */
export function getSingerList() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  let data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 1576475597,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, opts)
}

/**
 * jsonp 抓取歌手详情页数据
 * 出现页面：https://y.qq.com/portal/singer_list.html
 * 接口：https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg
 * singermid:002J4UUk29y8BY
 */
export function getSingerDetail(singermid) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  let data = Object.assign({}, commonParams, {
    g_tk: 1576475597,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singermid
  })
  return jsonp(url, data, opts)
}
