function e(e, n, o) {
  return K.log("createHttpRequest 111"), new Promise(function (u, a) {
    K.wxPromisify(wx.request, n)({
      url: o || W.HTTP_REQUEST_URL,
      data: {
        data: e
      },
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: "POST"
    }).then(function (e) {
      K.log(e);
      var r = t(e.data);
      if (null === r) {
        wx.canIUse("reportMonitor") && wx.reportMonitor("1", 1);
        return new Promise(function (e, r) {
          r("返回数据为空");
        });
      }
      return 0 != r.result ? new Promise(function (e, n) {
        n(r.reason);
      }) : r.data;
    }).then(function (e) {
      u(e);
    }).catch(function (e) {
      a(e), r(e);
    });
  });
}

function r(e) {
  K.log(e), wx.canIUse("reportMonitor") && wx.reportMonitor("0", 1);
  var r = "网络请求失败，请检查网络连接";
  e && "string" == typeof e && (r = e), wx.showToast({
    title: r,
    icon: "none",
    duration: 2e3
  });
}

function n(e) {
  var r = JSON.stringify(e);
  K.log("=====请求数据====="), K.log(r), r = Q.utf16to8(r);
  var n = Q.xxtea_encrypt(r, W.CLIENT_KEY);
  return new Y.Base64().encode(n);
}

function t(e) {
  t = null;
  try {
    var r = new Y.Base64().decode(e), n = Q.xxtea_decrypt(r, W.CLIENT_KEY);
    n = Q.utf8to16(n), K.log("=====响应数据====="), K.log(n);
    var t = JSON.parse(n);
  } catch (e) {
    K.log(e);
  }
  return t;
}

function o(e) {
  var r = {
    command: W.CMD_USER_LOGIN_REQ,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    code: e.code,
    encryptedData: e.encryptedData,
    iv: e.iv,
    referrerId: e.referrerId || "",
    channelId: e.channelId || "",
    typeId: e.typeId || "",
    redEnvelopeId: e.rId || "",
    scene: e.scene || ""
  }, K.log("buildUserLoginData 100"), n(r);
}

function u() {
  var e = {
    command: W.CMD_GET_STEP_CONFIG,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildGetStepConfig 101"), n(e);
}

function a() {
  var e = {
    command: W.CMD_GET_NOTICE_LIST,
    version: W.CLIENT_VERSION
  };
  return K.log("buildGetNoticeList 102"), n(e);
}

function i() {
  var e = {
    command: W.CMD_GET_REFERRAL_LIST,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildGetReferralList 103"), n(e);
}

function d(e) {
  var r = {
    command: W.CMD_GET_REWARD_REQ,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    uid: J.userInfo.userId,
    redEnvelopeId: e.redEnvelopeId,
    rewardSeq: e.rewardSeq
  }, K.log("buildGetRewardReq 104"), n(r);
}

function I(e) {
  var r = {
    command: W.CMD_TAKE_CASH,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    uid: J.userInfo.userId,
    receivedType: e.receivedType
  }, K.log("buildReqTakeCash 105"), n(r);
}

function s() {
  var e = {
    command: W.CMD_GET_CALORIE_DETAILS,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildGetCalorieDetails 106"), n(e);
}

function c(e) {
  var r = {
    command: W.CMD_GET_MY_STEPS,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    uid: J.userInfo.userId,
    code: e.code || "",
    encryptedData: e.encryptedData,
    iv: e.iv,
    scene: e.scene || ""
  }, K.log("buildGetMySteps 107"), n(r);
}

function _() {
  var e = {
    command: W.CMD_WECHAT_AD_LIST,
    version: W.CLIENT_VERSION
  };
  return K.log("buildGettWechatAdList 108"), n(e);
}

function E() {
  var e = {
    command: W.CMD_GET_TASK_LIST,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildGetTaskList 109"), n(e);
}

function f(e) {
  var r = {
    command: W.CMD_USER_COMPLAINT,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    uid: J.userInfo.userId,
    complaintType: e.complaintType,
    complaintDes: e.complaintDes
  }, K.log("buildUserComplaint 110"), n(r);
}

function l(e) {
  var r = {
    command: W.CMD_FINISH_TASK,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    uid: J.userInfo.userId,
    taskId: e.taskId
  }, K.log("buildFinishTask 110"), n(r);
}

function T() {
  var e = {
    command: W.CMD_GET_FLOAD_LIST,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildGetFloadList 112"), n(e);
}

function R(e) {
  var r = {
    command: W.CMD_CLICK_FLOAD_TASK,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    uid: J.userInfo.userId,
    typeId: e.typeId
  }, e.rid && (r.data.referrerRedEnvelopeId = e.rid), K.log("buildClickFloadTask 113"),
    n(r);
}

function m(e) {
  var r = {
    command: W.CMD_GET_SHARE_IMG,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    imageType: e.imageType
  }, K.log("buildGetShareImg 114"), n(r);
}

function C(e) {
  var r = {
    command: W.CMD_GET_JUMP_INFO,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    channelId: e
  }, K.log("buildGetJumpInfo 115"), n(r);
}

function N(e) {
  var r = {
    command: W.CMD_APP_JUMP_REPORT,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    uid: J.userInfo.userId,
    appId: e.appId
  }, K.log("buildReportAppJump 116"), n(r);
}

function g() {
  var e = {
    command: W.CMD_GET_REWARD_RED_LIST,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildGetRewardRedList 117"), n(e);
}

function v(e) {
  var r = {
    command: W.CMD_OPEN_INVITE_RED,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    uid: J.userInfo.userId,
    typeId: e.typeId,
    redEnvelopeId: e.rId
  }, K.log("buildGetOpenInviteRed 118"), n(r);
}

function L() {
  var e = {
    command: W.CMD_GET_HISTORY_RED_LIST,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildHistoryRedList 119"), n(e);
}

function S(e) {
  var r = {
    command: W.CMD_SAVE_SUBMIT_ID,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    uid: J.userInfo.userId,
    formId: e.formId
  }, K.log("buildSaveSubmitId 120"), n(r);
}

function p() {
  var e = {
    command: W.CMD_MATCH_INFO_DATA,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildGetMatchInfo 120"), n(e);
}

function D() {
  var e = {
    command: W.CMD_TOTAL_PALYER_REWARD,
    version: W.CLIENT_VERSION
  };
  return K.log("buildUpdateTotalData 122"), n(e);
}

function O() {
  var e = {
    command: W.CMD_GET_MATCH_REWARD,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildGetMatchReward 123"), n(e);
}

function G() {
  var e = {
    command: W.CMD_GET_SYSTEM_INFORMS,
    version: W.CLIENT_VERSION
  };
  return K.log("buildGetSystemInforms 124"), n(e);
}

function M() {
  var e = {
    command: W.CMD_GET_NEW_USER_REWARD,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildGetNewUserReward 125"), n(e);
}

function w() {
  var e = {
    command: W.CMD_GET_CLOCK_DETAILS,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildGetClockDetails 126"), n(e);
}

function A(e) {
  var r = {
    command: W.CMD_REQ_SIGN_UP_CLOCK,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    uid: J.userInfo.userId,
    formId: e.formId || ""
  }, K.log("buildReqUserSignUpClock 127"), n(r);
}

function b() {
  var e = {
    command: W.CMD_REQ_USER_CLOCK,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildReqUserClock 128"), n(e);
}

function h() {
  var e = {
    command: W.CMD_GET_CLOCK_REWARD,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildGetClockReward 128"), n(e);
}

function P(e) {
  var r = {
    command: W.CMD_GET_PAGE_OF_RANK,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    pageType: e.pageType,
    curPage: e.curPage
  }, K.log("buildGetPageOfRank 130"), n(r);
}

function y() {
  var e = {
    command: W.CMD_GET_TAKE_DATA,
    version: W.CLIENT_VERSION
  };
  return K.log("buildGetTakeData 131"), n(e);
}

function U() {
  var e = {
    command: W.CMD_GET_TAKE_HISTORY,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    uid: J.userInfo.userId
  }, K.log("buildGetTakeHistory 132"), n(e);
}

function V() {
  var e = {
    command: W.CMD_GET_GOODS_LIST,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    appId: W.CLIENT_APPID,
    uid: J.userInfo.userId
  }, K.log("buildGetGoodsList 1"), n(e);
}

function k(e) {
  var r = {
    command: W.CMD_GET_GOODS_DETAILS,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    appId: W.CLIENT_APPID,
    iesId: e.iesId || ""
  }, K.log("buildGetGoodsDetails 2"), n(r);
}

function H() {
  var e = {
    command: W.CMD_GET_EXCHANGE_HISTORY,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    appId: W.CLIENT_APPID,
    uid: J.userInfo.userId
  }, K.log("buildGetExchangeHistory 3"), n(e);
}

function x() {
  var e = {
    command: W.CMD_GET_INTEGRAL_INFO,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    appId: W.CLIENT_APPID,
    uid: J.userInfo.userId
  }, K.log("buildGetIntegralInfo 4"), n(e);
}

function q() {
  var e = {
    command: W.CMD_GET_INTEGRAL_REWARD,
    version: W.CLIENT_VERSION
  };
  return e.data = {
    appId: W.CLIENT_APPID,
    uid: J.userInfo.userId
  }, K.log("buildGetIntegralReward 5"), n(e);
}

function F(e) {
  var r = {
    command: W.CMD_GET_GOODS_REWARD,
    version: W.CLIENT_VERSION
  };
  return r.data = {
    appId: W.CLIENT_APPID,
    uid: J.userInfo.userId,
    iesId: e.iesId,
    address: e.address || "",
    phone: e.phone,
    addressee: e.userName || ""
  }, K.log("buildGetGoodsReward 6"), n(r);
}

var W = require("./httpDefine.js"), K = require("../utils/util.js"), Q = require("../utils/xxtea.js"), J = require("../utils/globalDefine.js"), Y = require("../utils/base64.js");

require("../utils/md5.js");

module.exports = {
  requestWxLogin: function (n) {
    return K.log("requestWxLogin start"), new Promise(function (t, u) {
      K.wxPromisify(wx.login)().then(function (r) {
        var u = {};
        u.code = r.code, u.iv = n.iv, u.encryptedData = n.encryptedData, n.scene && (u.scene = n.scene),
          n.referrerId && (u.referrerId = n.referrerId), n.channelId && (u.channelId = n.channelId),
          n.typeId && (u.typeId = n.typeId), n.rId && (u.rId = n.rId), e(o(u)).then(function (e) {
            var r = {};
            r.userId = e.uid, r.userName = unescape(e.userName), r.headImg = e.headImg, r.rewardNum = e.rewardNum,
              r.newUserReward = e.newUserReward, r.newUserRewardAmount = e.newUserRewardAmount,
              r.isNewUser = e.isNewUser, r.allowWithdrawal = e.allowWithdrawal, e.referrerInfo && (e.referrerInfo.userName = unescape(e.referrerInfo.userName || ""),
                r.referrerInfo = e.referrerInfo), J.setTestFlag(e.testFlag), r.invitedResult = e.invitedResult || 6,
              "" != r.userName && "" != r.headImage ? r.hasInfo = !0 : r.hasInfo = !1, J.setUserLoginInfo(r),
              J.sign = e.token, t(e), setTimeout(function () {
                var e = getCurrentPages();
                e && e.length > 0 && e[e.length - 1].onWxLoginCallBack();
              }, 800);
          });
      }).catch(function (e) {
        r(e);
      });
    });
  },
  getStepConfig: function () {
    return e(u(), 2);
  },
  getNoticeList: function () {
    return e(a(), 2);
  },
  getReferralList: function () {
    return e(i());
  },
  getRewardReq: function (r) {
    return e(d(r));
  },
  reqTakeCash: function (r) {
    return e(I(r));
  },
  getCalorieDetails: function () {
    return e(s());
  },
  getMySteps: function (r) {
    return e(c(r));
  },
  getWechatAdList: function () {
    return e(_(), 2);
  },
  getTaskList: function () {
    return e(E());
  },
  userComplaint: function (r) {
    return e(f(r));
  },
  finishTask: function (r) {
    return e(l(r));
  },
  getFloadList: function () {
    return e(T());
  },
  clickFloadTask: function (r) {
    return e(R(r));
  },
  getShareImg: function (r) {
    return e(m(r));
  },
  getJumpInfo: function (r) {
    return e(C(r));
  },
  reportAppJump: function (r) {
    return e(N(r));
  },
  getRewardRedList: function () {
    return e(g());
  },
  getOpenInviteRed: function (r) {
    return e(v(r));
  },
  getHistoryRedList: function () {
    return e(L());
  },
  saveSubmitId: function (r) {
    return e(S(r));
  },
  getMatchInfo: function () {
    return e(p());
  },
  updateTotalData: function () {
    return e(D(), 2);
  },
  getMatchReward: function () {
    return e(O());
  },
  getSystemInforms: function () {
    return e(G());
  },
  getNewUserReward: function () {
    return e(M());
  },
  getClockDetails: function () {
    return e(w());
  },
  reqSignUpClock: function (r) {
    return e(A(r));
  },
  reqUserClock: function () {
    return e(b());
  },
  getClockReward: function () {
    return e(h());
  },
  getPageOfRank: function (r) {
    return e(P(r));
  },
  getTakeData: function () {
    return e(y());
  },
  getTakeHistory: function () {
    return e(U());
  },
  getGoodsList: function () {
    return e(V(), 2, W.HTTP_REQUEST_URL1);
  },
  getGoodsDetails: function (r) {
    return e(k(r), 1, W.HTTP_REQUEST_URL1);
  },
  getExchangeHistory: function () {
    return e(H(), 1, W.HTTP_REQUEST_URL1);
  },
  getIntegralInfo: function () {
    return e(x(), 2, W.HTTP_REQUEST_URL1);
  },
  getIntegralReward: function () {
    return e(q(), 1, W.HTTP_REQUEST_URL1);
  },
  getGoodsReward: function (r) {
    return e(F(r), 1, W.HTTP_REQUEST_URL1);
  }
};