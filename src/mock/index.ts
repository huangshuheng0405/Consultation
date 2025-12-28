import Mock from 'mockjs'

export default [
  // 模拟接口
  {
    url: '/patient/message/sys/list',
    method: 'get',
    timeout: 500,
    response: () => {
      const data = []
      for (let i = 0; i < 10; i++) {
        data.push(
          Mock.mock({
            id: '@guid',
            title: '@ctitle(5, 10)',
            content: '@cparagraph(1, 2)',
            avatar: '@avatar',
            createTime: '@datetime',
            status: '@integer(0, 1)',
            type: '@integer(1, 3)'
          })
        )
      }
      return {
        code: 10000,
        message: '模拟数据成功',
        data
      }
    }
  }
]
