function e(e, a, n) {
    return a in e ? Object.defineProperty(e, a, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = n, e;
}

function a(e) {
    return e < 10 ? "0" + e : e;
}

var n = require("./utils.js"), s = require("./request.js"), i = require("./urls.js"), t = require("./wglogin.js"), r = require("./toast.js");

module.exports = {
    SENDGOODSC: function(e, a, o, g) {
        s.POST({
            url: i.SENDGOODSC,
            params: {
                goodsId: e,
                userId: t.USERINFO().userId,
                collectionStatus: a
            },
            success: function(e) {
                o(e);
            },
            fail: function(e) {
                n.isEmpty(g) ? r.FAIL(e.msg) : g(e);
            }
        });
    },
    GETDATAWITHUSERID: function(e, a, n, i) {
        s.POST({
            url: e,
            params: {
                actType: i,
                userId: t.USERINFO().userId
            },
            success: function(e) {
                a(e);
            },
            fail: function(e) {}
        });
    },
    WELFARELIST: function(e, a, n, i) {
        var r = a;
        r.userId = t.USERINFO().userId, s.POST({
            url: e,
            params: r,
            success: function(e) {
                n(e);
            },
            fail: function(e) {}
        });
    },
    GETDATAWITHPARAMS: function(e, a, n, i) {
        var r = a;
        r.userId = t.USERINFO().userId, s.POST({
            url: e,
            params: r,
            success: function(e) {
                n(e);
            },
            fail: function(e) {
                i(e);
            }
        });
    },
    INDEXSHAREtICKETS: function(e, a, i, t) {
        var o = a;
        s.POST({
            url: e,
            params: o,
            success: function(e) {
                i(e);
            },
            fail: function(e) {
                n.isEmpty(t) ? r.FAIL(e.msg) : t(e);
            }
        });
    },
    SCENEVALUE: function() {
        return {
            1001: "发现栏小程序主入口",
            1005: "顶部搜索框的搜索结果页",
            1006: "发现栏小程序主入口搜索框的搜索结果页",
            1007: "单人聊天会话中的小程序消息卡片",
            1008: "群聊会话中的小程序消息卡片",
            1011: "扫描二维码",
            1012: "长按图片识别二维码",
            1013: "手机相册选取二维码",
            1014: "小程序模板消息",
            1017: "前往体验版的入口页",
            1019: "微信钱包",
            1020: "公众号profile页相关小程序列表",
            1022: "聊天顶部置顶小程序入口",
            1023: "安卓系统桌面图标",
            1024: "小程序profile页",
            1025: "扫描一维码",
            1026: "附近小程序列表",
            1027: "顶部搜索框搜索结果页“使用过的小程序”列表",
            1028: "我的卡包",
            1029: "卡券详情页",
            1030: "自动化测试下打开小程序",
            1031: "长按图片识别一维码",
            1032: "手机相册选取一维码",
            1034: "微信支付完成页",
            1035: "公众号自定义菜单",
            1036: "App分享消息卡片",
            1039: "从小程序进入",
            1038: "摇电视",
            1042: "添加好友搜索框的搜索结果页",
            1043: "公众号模板消息",
            1044: "带shareTicket的小程序消息卡片",
            1047: "扫描小程序码",
            1048: "长按图片识别小程序码",
            1049: "手机相册选取小程序码",
            1052: "卡券的适用门店列表",
            1053: "搜一搜的结果页",
            1054: "顶部搜索框小程序快捷入口",
            1056: "音乐播放器菜单",
            1057: "钱包中的银行卡详情页",
            1058: "公众号文章",
            1059: "体验版小程序绑定邀请页",
            1064: "微信连Wifi状态栏",
            1067: "公众号文章广告",
            1068: "附近小程序列表广告",
            1071: "钱包中的银行卡列表页",
            1072: "二维码收款页面",
            1073: "客服消息列表下发的小程序消息卡片",
            1074: "公众号会话下发的小程序消息卡片",
            1078: "连wifi成功页",
            1089: "微信聊天主界面下拉",
            1090: "长按小程序右上角菜单唤出最近使用历史",
            1092: "城市服务入口",
            1079: "微信游戏中心",
            1081: "客服消息下发的文字链",
            1082: "公众号会话下发的文字链",
            1091: "公众号文章商品卡片",
            1095: "小程序广告组件",
            1096: "聊天记录",
            1097: "微信支付签约页",
            1102: "服务号profile页服务预览"
        };
    },
    TYPEVALUE: function() {
        return {
            index_reward: "首页-首屏-赚步数-底部banner",
            index_ran: "顶部搜索框的搜索结果页",
            diary: "首页-首屏-汗水日记-banner",
            TOP: "首页-我的小目标上方-banner",
            INVITE: "首页-邀请专区-banner",
            TIME_PURCHASE: "首页-步友专区-banner",
            BOTTOM: "首页-底部广告",
            ORDINARY: "首页-精选专区-banner",
            goodspage_time_purchase: "商品专区-步友专区内-banner",
            goodspage_ordinar: "商品专区-精选专区内-banner",
            activityTab: "活动页面-顶部banner",
            mine_banner: "我的页面-中部banner",
            mine_remond_app: "我的页面-精品推荐",
            luckdrew: "我的页面-抽奖-banner",
            messages: "我的页面-消息通知-banner",
            steps_details: "我的页面-步数明细-banner",
            after_sale_service: "我的页面-退款&售后-banner",
            my_orders: "我的页面-我的订单-banner",
            goodsCollection: "我的页面-商品收藏-banner",
            friend_call: "活动页面-好友召回-底部banner",
            luckdrawInfo_sponsor: "抽奖详情页-赞助商广告位",
            luckdrawInfo_sponsor_desc: "抽奖详情页-赞助商简介广告位",
            moneytree: "开宝箱/摇钱树页面-底部广告位",
            answer_end: "答题结果页面-banner",
            answer_result: "答题结果页面-最强成语",
            challenge_top: "挑战赛首页-banner",
            challenge_detail_sponsor: "挑战赛详情页-赞助商广告位",
            challenge_detail_top: "挑战赛详情页-顶部banner",
            community: "社区首页-顶部banner"
        };
    },
    COMMODITYAREA: function() {
        return {
            TIRO: "新手专区（新)",
            ORDINARY: "普通专区",
            NOVICE: "新手专区（闪兑专区）",
            INVITE: "邀请专区",
            SIGNIN: "签到专区",
            TIME_PURCHASE: "限时换购(热销爆款)(步友专享（币加钱）",
            NEW_PRODUCT: "新品推荐",
            HELP: "助力专区",
            VIRTUAL: "虚拟专区",
            NEWCOMER: "新人专区-B",
            DIAMOND: "火力专区-B",
            CHOICE: "推荐专区-B",
            LUCKY: "幸运专区",
            REFERRER: "邀请专区-B"
        };
    },
    commodityArea_B: function() {
        return {
            1: "B版_新手专属",
            2: "B版_邀请专区",
            3: "B版_火力专属",
            4: "B版_召回",
            5: "B版_签到 ",
            6: "B版_精选"
        };
    },
    GETREWARD: function() {
        return {
            21: "首次邀请好友",
            22: "邀请好友5个好友",
            23: "新手专区（闪兑专区）",
            24: "邀请好友25个好友",
            25: "邀请好友50个好友",
            26: "今日邀请一人"
        };
    },
    HOMEPAGE: function() {
        var a;
        return a = {
            "pages/index/index": "步数宝",
            "pages/index/list/list": "好友列表",
            "pages/index/goodlist/goodlist": "商品详情",
            "pages/index/goodMoreList/goodMoreList": "goodMoreList",
            "pages/classify/classify": "二级商品列表页",
            "pages/mine_new/mine_new": "我的",
            "pages/mine_new/about/about": "联系我们",
            "pages/mine_new/address/address": "地址管理",
            "pages/mine_new/helpList/helpList": "好友助力",
            "pages/mine_new/addressInfo/addressInfo": "地址管理详情",
            "pages/mine_new/myluckdraw/myluckdraw": "我的抽奖",
            "pages/mine_new/mall/order/order": "我的订单",
            "pages/mine_new/mall/orderdetalis/orderdetails": "订单详情",
            "pages/mine_new/mall/Refund/Refund": "申请退款",
            "pages/mine_new/mall/ApplicationForRefund/ApplicationForRefund": "提交退款",
            "pages/mine_new/mall/RefundWait/RefundWait": "退款详情",
            "pages/mine_new/mall/saleRefund/saleRefund": "售后/退款",
            "pages/mine_new/mall/consultativeHistory/consultativeHistory": "协商历史",
            "pages/mine_new/mall/logistics/logistics": "填写物流单号",
            "pages/subpackage/roles/roles": "规则",
            "pages/subpackage/question/question": "常见问题",
            "pages/setup/setup": "设置",
            "pages/subpackage/diary/diary": "我的汗水日记",
            "pages/subpackage/message/message": "消息通知",
            "pages/changed/changed": "兑换成功",
            "pages/index/detailList/detailList": "燃力明细",
            "pages/subpackage/message/messagedetails/messagedetails": "消息详情",
            "pages/activityTab/activitytab": "活动",
            "pages/setpDetails/setpDetails": "步数明细",
            "pages/index/activeReward/activeReward": "奖励",
            "pages/index/activeReward/activeRewardB": "B版本奖励",
            "pages/mine_new/mall/sumbitorder/sumbitorder": "提交订单",
            "pages/mine_new/mall/payfail/pafail": "支付失败",
            "pages/mine_new/goodsCollection/goodsCollection": "宝贝收藏",
            "pages/mine_new/friendList/friendList": "我的好友",
            "pages/index/assistingarea/assistingarea": "assistingarea",
            "pages/mine_new/mall/components/AdvertInfo/AdvertInfo": "AdvertInfo",
            "pages/index/activeReward/guideFollow/guideFollow": "关注公众号",
            "pages/activity/signView/newSignIn/newSignIn": "签到提醒",
            "pages/activity/signView/signViewA/signView": "签到页面",
            "pages/activity/signView/signViewB/signViewB": "B版本新人签到页面",
            "pages/activity/signView/signInB/signInB": "B版本迎新红包",
            "pages/index/goodlist/exchangelist/exchangelist": "兑换记录",
            "pages/webView/webView": "TODO",
            "pages/subpackage/setup/bindPhone/bindPhone": "绑定手机号",
            "pages/index/productValue/productValue": "产品价值",
            "pages/xmadPage/collect": "collect",
            "pages/xmadPage/sell": "sell",
            "pages/xmadPage/copyInfo": "复制信息",
            "pages/ence_push/ence_push": "测试体验",
            "pages/mine_new/mall/logisticsDetails/logisticsDetail": "物流信息",
            "pages/mine_new/helpAndFeedback/helpAndFeedback": "帮助与反馈",
            "pages/index/additionRule/additionRule": "邀请好友",
            "pages/subpackage/diary/sportsCalendar/sportsCalendar": "历史记录",
            "pages/index/maintain/maintain": "TODO",
            "pages/subpackage/shopindex/shopindex": "店铺主页",
            "pages/shopindex/concernShop/concernShop": "关注店铺",
            "pages/team/team": "健步团",
            "pages/communityHomepage/community": "步友圈",
            "pages/apptransit/apptransit": "同步app步数",
            "pages/mine_new/communityNorms/communityNorms": "步友圈规范",
            "pages/goApp/downloadApp/downloadApp": "下载APP",
            "pages/goApp/goApp": "签到有奖",
            "pages/gamePage/gameSdk/gamePage": "盘游戏",
            "pages/teamSubPackages/record/record": "我的团队记录",
            "pages/teamSubPackages/teamInfo/teamInfo": "团队详情",
            "pages/teamSubPackages/teamManagement/teamManagement": "团队管理",
            "pages/teamSubPackages/memberManagement/memberManagement": "成员管理",
            "pages/teamSubPackages/createTeam/createTeam": "创建战队",
            "pages/teamSubPackages/editManifesto/editManifesto": "团队宣言",
            "pages/teamSubPackages/editTeamName/editTeamName": "团队名称",
            "pages/teamSubPackages/teamRule/teamRule": "健步团规则",
            "pages/community/msgNotify/msgNotify": "TODO",
            "pages/community/communityInfo/communityInfo": "步友圈详情",
            "pages/community/personalhomepage/personalhomepage": "个人主页",
            "pages/community/release/release": "发布",
            "pages/community/myAttention/myAttention": "我的关注",
            "pages/community/sportRunning/sportRunning": "玩转步友圈1",
            "pages/community/topic/topic": "选择话题",
            "pages/community/topicList/topicList": "话题聚合页",
            "pages/community/communityInvite/communityInvite": "玩转步友圈2",
            "pages/community/changInfo/changInfo": "个人信息",
            "pages/community/allTopic/allTopic": "全部话题",
            "pages/community/releaseSuccess/releaseSuccess": "发布成功",
            "pages/community/communityInfoList/communityInfoList": "回复详情",
            "pages/answer/pages/shareAnswer/shareAnswer": "助力/pk答题",
            "pages/answer/pages/answer": "答题作战",
            "pages/activity/challenge/challenge": "挑战",
            "pages/activity/challengedetails/challengedetails": "挑战中详情",
            "pages/activity/challenges/challenges": "挑战前详情",
            "pages/activity/challengeshare/challengeshare": "挑战分享",
            "pages/activity/friendCall/friendCall": "好友召回",
            "pages/activity/luckdraw/luckdraw": "抽奖",
            "pages/activity/welfareList/welfareList": "公益列表",
            "pages/activity/welfare/welfare": "公益-行走的爱",
            "pages/activity/welfare/welfareDone/welfareDone": "行走的爱-捐燃力完成",
            "pages/activity/welfare-hope/welfare-hope": "公益-行走“书”送希望",
            "pages/activity/welfare-hope/welfareDone/welfareDone": "行走“书”送希望-捐燃力完成",
            "pages/activity/welfare-hope3/welfare-hope3": "公益-瓷娃娃",
            "pages/activity/welfare-hope3/welfareDone/welfareDone": "瓷娃娃-捐燃力完成",
            "pages/activity/welfare-hope4/welfare-hope4": "公益-病房图书馆",
            "pages/activity/welfare-hope4/welfareDone/welfareDone": "病房图书馆-捐燃力完成",
            "pages/activity/luckdraw/luckdrawInfo/luckdrawInfo": "抽奖详情",
            "pages/activity/luckdraw/luckdrawRule/luckdrawRule": "抽奖规则",
            "pages/activity/luckdraw/lotteryCode/lotteryCode": "我的抽奖码",
            "pages/activity/moneytree/moneytree": "摇钱树",
            "pages/activity/moneytree/roles/roles": "摇钱树规则"
        }, e(a, "pages/communityHomepage/community", "步友圈"), e(a, "pages/coupon/activityRule/activityRule", "赏金赛规则"), 
        e(a, "pages/coupon/userAgreement/userAgreement", "赏金赛协议"), e(a, "pages/mine_new/wallet/wallet", "我的钱包"), 
        e(a, "pages/mine_new/wallet/walletDetails/walletDetails", "交易明细"), e(a, "pages/mine_new/wallet/cashOut/cashOut", "提现"), 
        e(a, "pages/coupon/rewardChallenge/rewardChallenge", "赏金赛"), e(a, "pages/coupon/newRewardChallenge/newRewardChallenge", "新版本赏金赛"), 
        e(a, "pages/community/videoTask/videoTask", "看视频换商品"), e(a, "pages/community/videoTask/rule/rule", "看视频换商品-规则"), 
        e(a, "pages/coupon/shopCar/shopCar", "购物车"), e(a, "pages/coupon/sumbitorder/sumbitorder", "步有专享提交订单"), 
        e(a, "pages/growth/growth", "成长体系"), e(a, "pages/growth/rule/rule", "成长体系规则"), e(a, "pages/classify/newClassify/newClassify", "B版更多商品列表"), 
        e(a, "pages/anniversary/anniversary", "周年活动页面"), a;
    },
    BASISSHAREPATH: function(e) {
        var a = "/pages/index/index?userId=" + t.USERINFO().userId;
        if (!e || "{}" == JSON.stringify(e)) return a += "&source=1";
        e.hasOwnProperty("basisPath") && "" != e.basisPath && (a = a + "&pageName=" + encodeURIComponent(e.basisPath));
        for (var n in e) "basisPath" != n && e.hasOwnProperty(n) && "" != e[n] && (a = a + "&" + n + "=" + e[n]);
        return e.hasOwnProperty("source") || (a += "&source=1"), a;
    },
    timestampToTime: function(e) {
        e = parseInt(e);
        var n = new Date(1e3 * e);
        return n.getFullYear() + "-" + (n.getMonth() + 1 < 10 ? "0" + (n.getMonth() + 1) : n.getMonth() + 1) + "-" + a(n.getDate()) + " " + a(n.getHours()) + ":" + a(n.getMinutes()) + ":" + a(n.getSeconds());
    },
    insertUserAdvert: function(e, a) {
        s.POST({
            url: i.insertUserAdvert,
            params: {
                appId: e,
                code: a
            },
            success: function(e) {
                console.log("insertUserAdvertresok", e);
            },
            fail: function(e) {}
        });
    }
};