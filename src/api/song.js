import axios from 'axios'
import { commonParams } from '@/api/common-query.js'

/**
 * axios 抓取歌词数据
 * 接口：https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg
 * 原始地址：https://y.qq.com/portal/player.html
 * 接口提供方使用了 referer:https://y.qq.com/portal/player.html
 * axios 结合 node.js 代理后端请求
 */
export function getLyric(mid) {
  let url = '/api/getLyric'
  let data = Object.assign({}, commonParams, {
    songmid: mid,
    // g_tk: 67232076,
    format: 'json',
    pcachetime: +new Date(),
    platform: 'yqq',
    // categoryId: 10000000,
    hostUin: 0,
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  })
  .then((res) => {
    return Promise.resolve(res.data)
  })
  .catch((err) => {
    console.log(err)
  })
}
