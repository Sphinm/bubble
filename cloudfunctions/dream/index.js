// 云函数入口文件
const cloud = require("wx-server-sdk");
const axios = require("axios");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 配置信息
const categoryUrl = "http://v.juhe.cn/dream/category";
const queryByWord = "http://v.juhe.cn/dream/query";
const queryById = "http://v.juhe.cn/dream/queryid";
const key = "34af01a61dcc59f94ebd4209e33992fb";

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case "dreamCategory":
      return dreamCategory(event);
    case "dreamQuery":
      return dreamQuery(event);
    case "dreamDetail":
      return dreamDetail(event);
    default:
      return {};
  }
};

/**
 * 梦的类型
 * 首先判断查询记录是否存在
 * 如果存在从云函数数据库中返回，如果没有从聚合 api 请求并入库
 * @param {*} event
 */
async function dreamCategory(event) {
  const fId = event.fId || "0";

  console.log("fId", fId);

  const ret = await db
    .collection("dreamCategory")
    .where({
      fid: fId,
    })
    .get();

  console.log('ret', ret)
  if (ret.data.length > 0) {
    return ret.data[0].result;
  }
  console.log('ret2')

  const params =
    fId === "0"
      ? { key }
      : {
          key,
          fid: fId,
        };

  const resp = await axios
    .get(categoryUrl, {
      params,
    })
    .then(res => {
      return res.data;
    });
  console.log("resp", resp);

  await db.collection("dreamCategory").add({
    data: {
      fid: fId,
      result: resp.result,
    },
  });

  return resp.result;
}

/**
 * 解梦查询
 * 首先判断查询记录是否存在
 * 如果存在从云函数数据库中返回，如果没有从聚合 api 请求并入库
 * @param {*} event
 */
async function dreamQuery(event) {
  const { q, cid } = event;
  console.log("q", q);
  console.log("cid", cid);

  const ret = await db
    .collection('dreamQuery')
    .where({
      q: q,
      cid: cid,
    })
    .get();

  if (ret.data.length > 0) {
    return ret.data[0].result;
  }

  const resp = await axios
    .get(queryByWord, {
      params: {
        key,
        q: q,
        cid: cid,
      },
    })
    .then(res => {
      return res.data;
    });
  console.log("resp", resp);

  await db.collection('dreamQuery').add({
    data: {
      q: q,
      cid: cid,
      result: resp.result,
    },
  });

  return resp.result;
}

/**
 * 根据 ID 查询解梦信息
 * 首先判断查询记录是否存在
 * 如果存在从云函数数据库中返回，如果没有从聚合 api 请求并入库
 * @param {*} event
 */
async function dreamDetail(event) {
  const dreamid = event.dreamid;

  const ret = await db
    .collection("dreamDetail")
    .where({
      dreamid,
    })
    .get();

  console.log("dreamDetail", ret);
  if (ret.data.length > 0) {
    return ret.data[0].result;
  }

  const resp = await axios
    .get(queryById, {
      params: {
        key,
        id: dreamid,
      },
    })
    .then(res => {
      return res.data;
    });

  console.log("resp", resp);

  await db.collection("dreamDetail").add({
    data: {
      dreamid,
      result: resp.result,
    },
  });

  return resp.result;
}
