// 歌手信息类

export class Singer {
  // 传入一个对象
  constructor({id, name}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}

// 工厂方式创建类实例
export function createSinger(singer) {
  return new Singer({
    id: singer.Fsinger_mid,
    name: singer.Fsinger_name
  })
}
