import { getLyric } from '@/api/song.js'
import { Base64 } from 'js-base64'

// 处理 musicData.singer 数组，使其变为一个字符串
export function filterSinger(singer) {
  let result = []

  if (!singer) {
    return ''
  }

  singer.forEach((item) => {
    result.push(item.name)
  })

  return result.join(' / ')
}

export class SingerSong {
  constructor({id, mid, singer, name, album, duration, img, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.img = img
    this.url = url
  }
  // 获取歌词数据
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === 0) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export function createSingerSong(musicData) {
  return new SingerSong({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://10.151.0.22:9999/dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=66`(可用)
    // url: `https://thirdparty.gtimg.com/${musicData.songid}.m4a?fromtag=38`(不可用)
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}
