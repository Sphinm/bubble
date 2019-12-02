// 云函数入口文件
const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  console.log('event111', event)
  const param = {
    _openid: OPENID,
    avatarUrl: event.avatarUrl,
    city: event.city,
    code: event.code,
    gender: event.gender,
    nickName: event.nickName,
    update: +new Date()
  };
  if (event.id) {
    return await db
      .collection("users")
      .doc(event.id)
      .update({
        data: param,
      });
  } else {
    return await db.collection("users").add({
      data: param,
    });
  }
};
