// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    return removeAllData()
  } catch (e) {
    console.error(e)
  }
}

// 删除 bubble 集合中所有数据
async function removeAllData() {
  return await db.collection('bubble').where({
    _id: _.exists(true)
  }).remove()
}
