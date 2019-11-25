// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  console.log('触发器2222', event)
  try {
    return removeData()
  } catch (e) {
    console.error(e)
  }
}

async function removeData() {
  return await db.collection('bubble').where({
    _id: _.exists(true)
  }).remove()
}
