const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const { AUTH } = {
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
    default:
      return {}
  }
}

// 解析加密的微信运动信息
async function getWeRunAllData(event) {
  return event.weRunData.data.stepInfoList
}

async function getWeRunData(event) {
  const stepInfoList = event.weRunData.data.stepInfoList
  return stepInfoList[stepInfoList.length - 1]
}

async function collectFormId(event) {
  console.log('collectFormId', event)
  const sendResult = await cloud.openapi.templateMessage.send({
    // touser: event.touser,
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