// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const totalTipList = [];

// 云函数入口函数
exports.main = async(event, context) => {
  console.log('触发器inti2', event)
  try {
    return await addTipList()
  } catch (e) {
    console.error(e)
  }
}

async function addTipList() {
  const temp = await initData()
  console.log('initData', temp)
  for (const item of temp) {
    await db.collection("bubble").add({
      data: item,
      success(res) {
        console.log("success111", res);
      },
      fail(err) {
        console.log("fail222", err);
      },
    });
  }
}

/**
 * 初始化气泡数据
 */
async function initData() {
  const initTipList = await getInitData()
  for (let item of initTipList.data) {
    for (let i = 0; i < item.num; i++) {
      if (i == item.num - 1) delete item.num;
      delete item._id
      delete item._openid
      totalTipList.push(item);
    }
  }
  return totalTipList;
}

async function getInitData() {
  return await db.collection('initData').get()
}
