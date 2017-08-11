import jsonp from '@/common/js/jsonp'
import { commonParams, opts } from '@/api/common-query.js'

/**
 * jsonp 抓取热门搜索数据
 * 接口：https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg
 * 提供方：https://m.y.qq.com/#search
 */
export function getHotKey() {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  let data = Object.assign({}, commonParams, {
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, opts)
}

/**
 * jsonp 抓取搜索检索数据
 * 接口：https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp
 * 提供方：https://m.y.qq.com/#search
 */
export function search(query, page, perpage, zhida) {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  let data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    n: perpage,
    perpage,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    uin: 0,
    platform: 'h5',
    uid: 0,
    needNewCode: 1,
    remoteplace: 'txt.mqq.all'
  })
  return jsonp(url, data, opts)
}
