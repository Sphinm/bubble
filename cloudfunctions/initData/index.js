// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

/**
 * 初始化云函数
 */
exports.main = async(event, context) => {
  try {
    await updateBubble()
  } catch (e) {
    console.error(e)
  }
}

/**
 * 如果当前集合为空则插入
 */
async function updateBubble() {
  const bubbleOld = await getBubbleData()
  if (!bubbleOld.data.length) {
    const temp = await initData()
    for (const item of temp) {
      await db.collection('bubble').add({
        data: {
          ...item,
          createTime: +new Date(),
          bubble_id: getUUID()
        }
      }).then(res => {
        console.log('setBubble ', res)
      }).catch(err => {
        console.log('setBubble ', err)
      })
    }
  } else {
    // 获取 bubble 集合
    for (const item of bubbleOld.data) {
      await db.collection('bubble').update({
        data: {
          createTime: +new Date()
        }
      }).then(res => {
        console.log('updateBubble ', res)
      }).catch(err => {
        console.log('updateBubble ', err)
      })
    }
  }
}

/** 设置 uuid */
function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
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

// 获取 bubble 集合数据
async function getInitData() {
  return await db.collection('config_table').get()
}

// 获取 bubble 集合数据
async function getBubbleData() {
  return await db.collection('bubble').get()
}