function getUUID() {
  return Math.random().toString(36).slice(-8)
}

function randomArray(arr, len = 4) {
  const result = [];
  let count = arr.length;
  for (let i = 0; i < len; i++) {
    let index = ~~(Math.random() * count) + i;
    result[i] = arr[index];
    arr[index] = arr[i];
    count--
  }
  return result
}

/**
 * 获取当天 23:59:59 点的时间戳
 * 设置 localStorage 时带上时间戳
 */
function getEndTimeStamp() {
  return new Date(new Date().setHours(23, 59, 59, 0)).getTime()
}


module.exports = {
  getUUID,
  randomArray,
  getEndTimeStamp
}