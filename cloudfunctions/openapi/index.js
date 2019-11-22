// 云函数入口函数
exports.main = async(event, context) => {
  switch (event.action) {
    case 'getWeRunData':
      return getWeRunData(event)
    case 'getWeRunAllData':
      return getWeRunAllData(event)
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