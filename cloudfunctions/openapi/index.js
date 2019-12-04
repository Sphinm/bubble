const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const {
  AUTH
} = {
  AUTH: 'w19Wes2B0Vp-Wsj1Wp2pTh5flOu8Woh9LAN1Xw0jDqA'
}

// 云函数入口函数
exports.main = async(event, context) => {
  switch (event.action) {
    case 'getWeRunData':
      return getWeRunData(event)
    case 'getWeRunAllData':
      return getWeRunAllData(event)
    case 'collectFormId':
      return collectFormId(event)
    case 'addBubbleRecord':
      return addBubbleRecord(event)
    case 'testAddBubble':
      return testAddBubble(event)
    default:
      return {}
  }
}

// 解析一个月的微信运动信息
async function getWeRunAllData(event) {
  return event.weRunData.data.stepInfoList
}

// 解析当天的微信运动信息
async function getWeRunData(event) {
  const stepInfoList = event.weRunData.data.stepInfoList
  return stepInfoList[stepInfoList.length - 1]
}

// 发送模板消息
async function collectFormId(event) {
  console.log('collectFormId', event)
  const sendResult = await cloud.openapi.templateMessage.send({
    touser: cloud.getWXContext().OPENID,
    templateId: AUTH,
    formId: event.formId,
    page: 'pages/index/index',
    data: {
      keyword1: {
        value: event.inviteName
      },
      keyword2: {
        value: event.date
      },
      keyword3: {
        value: event.result
      },
      keyword4: {
        value: event.content
      },
    }
  })
  return sendResult
}

// 添加气泡到 bubble_record 表
async function addBubbleRecord(event) {
  try {
    return await db.collection('bubble_record').add({
      data: {
        step_nums: event.step_nums,
        title: event.title,
        type: event.type,
        bubble_id: event.bubble_id,
        createTime: db.serverDate()
      }
    })
  } catch (e) {
    console.error(e)
  }
}

// 给测试环境的 bubble 添加数据
async function testAddBubble(event) {
  return await db.collection('bubble').add({
    data: {
      ...event.item,
      createTime: db.serverDate()
    },
    success(res) {
      console.log('testAddBubble ', res)
    },
    fail(err) {
      console.log('testAddBubble ', err)
    }
  })
}