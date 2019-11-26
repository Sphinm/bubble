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
    await addBubble()
  } catch (e) {
    console.error(e)
  }
}

/**
 * 插入时先判断当前集合是否为空，如果存在删除已有数据，
 * 如果删除返回条数是0，则说明没有删除成功，继续递归调用
 */
async function addBubble() {
  const res = await removeData()
  const temp = await initData()
  const bubbleOld = await getBubbleData()
  console.log('res', res.stats.removed, bubbleOld.data.length)

  if (!bubbleOld.data.length || res.stats.removed) {
    console.log('temp', temp.length)
    for (const item of temp) {
      await db.collection("bubble").add({
        data: {
          ...item,
          createTime: db.serverDate()
        }
      }).then(res => {
        console.log('addBubble ', res)
      }).catch(err => {
        console.log('addBubble ', err)
      })
    }
  } else {
    console.log('第二次')
    await addBubble()
  }
}

async function removeData() {
  return await db.collection('bubble').where({
    _id: _.exists(true)
  }).remove()
}

/**
 * 初始化气泡数据
 */
async function initData() {
  const totalTipList = [];
  const initTipList = await getInitData()
  for (let item of initTipList.data) {
    for (let i = 0; i < item.num; i++) {
      if (i == item.num - 1) delete item.num;
      delete item._id
      totalTipList.push(item);
    }
  }
  return totalTipList;
}

async function getInitData() {
  return await db.collection('initData').get()
}

async function getBubbleData() {
  return await db.collection('bubble').get()
}