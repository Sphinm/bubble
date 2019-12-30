function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function randomArray(arr, len = 5) {
  const result = [];
  let count = arr.length;
  for (let i = 0; i < len; i++) {
    let index = ~~(Math.random() * count) + i;
    result[i] = arr[index];
    arr[index] = arr[i];
    count--;
  }
  return result;
}

/**
 * 获取当天零点的时间戳
 * 设置 localStorage 时带上时间戳
 * start: 零点
 * end: 23:59:59
 * 
 * 调用方法：getTimeStamp('start') 或者 getTimeStamp()
 */
function getTimeStamp(type) {
  if (type == 'start') {
    return new Date(new Date().setHours(0, 0, 0, 0)).getTime();
  }
  return new Date(new Date().setHours(23, 59, 59, 0)).getTime();
}

// 收集 formid
// getFormId(e) {
//   const formId = e.detail.formId;
//   const touser = App.globalData.openid;
//   wx.cloud.callFunction({
//     name: "openapi",
//     data: {
//       action: "collectFormId",
//       formId: formId,
//       touser: touser,
//       inviteName: "测试测试",
//       date: new Date(),
//       result: "我发送模板消息成功了",
//       content: "模板消息详情内容",
//     },
//     success(res) {
//       console.log("[云函数] [openapi collectFormId] 发送成功: ", res);
//     },
//     fail(err) {
//       console.error("[云函数] [openapi collectFormId] 发送失败: ", err);
//     },
//   });
// },

module.exports = {
  getUUID,
  randomArray,
  getTimeStamp,
};
