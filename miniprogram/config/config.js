/**
 * 维系一个总的气泡配置表 initTipList, 总数可配，每日零点重置并重新读取配置，
 * 根据配置表生成一个总的气泡数据 totalTipList, 每次随机取出四个气泡去展示，
 * 每个气泡都有一个随机的气泡id，点击一个气泡，将该气泡从 totalTipList 中取出，
 * 直至 totalTipList 为空
 *
 * type: 气泡类型
 * title: 名称
 * num: 该类型气泡个数
 */
// 全局配置表
export const configData = {
  onReview: true, // 审核与否
  initTipList: [{
      bubble_type: 0,
      bubble_title: "每日登录",
      num: 1,
      bubble_step: 111,
    },
    {
      bubble_type: 1,
      bubble_title: "激励视频",
      num: 10,
      bubble_step: 1000,
    },
    {
      bubble_type: 2,
      bubble_title: "幸运抽奖",
      num: 1,
      bubble_step: 222,
    },
    {
      bubble_type: 3,
      bubble_title: "答题大作战",
      num: 1,
      bubble_step: 333,
    },
    {
      bubble_type: 4,
      bubble_title: "收藏小程序",
      num: 1,
      bubble_step: 444,
    },
  ]
}

// 初始化 config 表
// initTipData() {
//   for (const item of initTipList) {
//     db.collection("config_table").add({
//       data: item,
//       success(res) {
//         console.log("success111", res);
//       },
//       fail(err) {
//         console.log("fail222", err);
//       },
//     });
//   }
// },

/**
 * 气泡相关表结构：
 * 1、user 表
 * 2、bubble 表
 * 3、bubble_record 表
 */