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
const todayList = "http://v.juhe.cn/todayOnhistory/queryEvent.php"
const historyDetailURL = "http://v.juhe.cn/todayOnhistory/queryDetail.php"
const key = "34af01a61dcc59f94ebd4209e33992fb";
const key_hs = "f1bf7e0414f46bc16d238c190cb217c0"

// 云函数入口函数
exports.main = async(event, context) => {
  switch (event.action) {
    case "dreamCategory":
      return dreamCategory(event);
    case "dreamQuery":
      return dreamQuery(event);
    case "dreamDetail":
      return dreamDetail(event);
    case "todayInHistory":
      return todayInHistory(event)
    case "historyDetail":
      return historyDetail(event)
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
    fId === "0" ? {
      key
    } : {
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
 */
async function dreamQuery(event) {
  const {
    q,
    cid
  } = event;
  const ret = await db
    .collection('dreamQuery')
    .where({
      q: q,
      cid: cid,
    })
    .limit(20)
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

/**
 * 获取今日历史事件列表
 */
async function todayInHistory(event) {
  const {
    month,
    day
  } = event

  const ret = await db.collection('todayInHistory').where({
      date: `${month}/${day}`
    })
    .limit(50)
    .get()

  if (ret.data.length > 0 && ret.data[0].result) {
    return ret.data[0].result
  }

  const resp = await axios.get(todayList, {
    params: {
      key: key_hs,
      date: `${month}/${day}`
    }
  }).then(res => {
    return res.data
  })

  await db.collection('todayInHistory').add({
    data: {
      date: `${month}/${day}`,
      result: resp.result
    }
  })

  return resp.result
}

/**
 * 获取今日历史事件详情
 */
async function historyDetail(event) {
  const eId = event.id;
  console.log('eId', eId)

  const ret = await db.collection('historyDetail').where({
    e_id: eId
  }).get()

  if (ret.data.length > 0) {
    return ret.data[0].result
  }

  const resp = await axios.get(historyDetailURL, {
    params: {
      key: key_hs,
      e_id: eId
    }
  }).then(res => {
    return res.data
  })
  console.log('resp', resp)

  await db.collection('historyDetail').add({
    data: {
      e_id: eId,
      result: resp.result
    }
  })

  return resp.result
}