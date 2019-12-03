// 云函数入口文件
const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  const param = {
    _openid: OPENID,
    avatarUrl: event.avatarUrl,
    city: event.city,
    code: event.code,
    gender: event.gender,
    nickName: event.nickName,
    updateTime: +new Date()
  };
  const { data } = await db.collection('users').where({ _openid: OPENID }).get()
  console.log('isNewUser', data)
  if (data.length) {
    return await db
      .collection("users")
      .doc(OPENID)
      .update({
        data: {
          updateTime: +new Date()
        },
      });
  } else {
    return await db.collection("users").add({
      data: param,
    });
  }
};
