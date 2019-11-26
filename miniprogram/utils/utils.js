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

module.exports = {
  getUUID,
  randomArray
}