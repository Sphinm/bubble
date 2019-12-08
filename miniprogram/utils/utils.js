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

module.exports = {
  getUUID,
  randomArray,
  getTimeStamp,
};
