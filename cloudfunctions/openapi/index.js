const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
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
    case 'fetchStepNum':
      return fetchStepNum(event)
    case 'updateBubbleConfig':
      return updateBubbleConfig(event)
    case 'fectchInitConfig':
      return fectchInitConfig(event)
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
        bubble_step: event.bubble_step,
        bubble_title: event.bubble_title,
        bubble_type: event.bubble_type,
        bubble_id: event.bubble_id,
        _openid: event.openid,
        record_id: event.record_id,
        createTime: +new Date(),
      }
    })
  } catch (e) {
    console.error(e)
  }
}

/**
 * 更新配置表数据
 * 可以在客户端请求，也可以在触发器更新
 */
async function updateBubbleConfig(event) {
  try {
    return await db.collection('config_table').add({
      data: event.config
    })
  } catch (e) {
    console.error(e)
  }
}

// 获取 config_table 集合数据
async function fectchInitConfig() {
  try {
    return await db.collection('config_table').get()
  } catch (e) {
    console.error(e)
  }
}

// 获取今日 bubble_record 步数数据
async function fetchStepNum(event) {
  try {
    console.log('event', event)
    return await db.collection('bubble_record').where({
      _openid: event.openid,
      createTime: _.gt(event.minTime).and(_.lt(event.maxTime))
    }).get()
  } catch (e) {
    console.error(e)
  }
}