var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a]);
    }
    return t;
};

Component({
    properties: {
        painting: {
            type: Object,
            value: {
                view: []
            },
            observer: function(t, e) {
                this.data.isPainting || t.width && t.height && (this.setData({
                    showCanvas: !0,
                    isPainting: !0
                }), this.readyPigment());
            }
        }
    },
    data: {
        showCanvas: !1,
        width: 100,
        height: 100,
        index: 0,
        imageList: [],
        tempFileList: [],
        isPainting: !1
    },
    ctx: null,
    cache: {},
    ready: function() {
        wx.removeStorageSync("canvasdrawer_pic_cache"), this.cache = wx.getStorageSync("canvasdrawer_pic_cache") || {}, 
        this.cache = {}, this.ctx = wx.createCanvasContext("canvasdrawer", this);
    },
    methods: {
        readyPigment: function() {
            var t = this, e = this.data.painting, i = e.width, a = e.height, n = e.views;
            this.setData({
                width: i,
                height: a
            });
            var s = setInterval(function() {
                t.ctx && (clearInterval(s), t.getImageList(n), t.downLoadImages(0));
            }, 100);
        },
        getImageList: function(t) {
            for (var e = [], i = 0; i < t.length; i++) "image" === t[i].type && e.push(t[i].url);
            this.setData({
                imageList: e
            });
        },
        downLoadImages: function(t) {
            var e = this, i = this.data, a = i.imageList, n = i.tempFileList;
            t < a.length ? this.getImageInfo(a[t]).then(function(i) {
                n.push(i), e.setData({
                    tempFileList: n
                }), e.downLoadImages(t + 1);
            }) : this.startPainting();
        },
        startPainting: function() {
            for (var e = this, i = this.data, a = i.tempFileList, n = i.painting.views, s = 0, h = 0; s < n.length; s++) "image" === n[s].type ? (this.drawImage(t({}, n[s], {
                url: a[h]
            })), h++) : "text" === n[s].type ? this.ctx.measureText ? this.drawText(n[s]) : wx.showModal({
                title: "提示",
                content: "当前微信版本过低，无法使用 measureText 功能，请升级到最新微信版本后重试。"
            }) : "rect" === n[s].type && this.drawRect(n[s]);
            this.ctx.draw(!0, function() {
                wx.setStorageSync("canvasdrawer_pic_cache", e.cache), e.saveImageToLocal();
            });
        },
        drawImage: function(t) {
            var e = t.url, i = t.top, a = void 0 === i ? 0 : i, n = t.left, s = void 0 === n ? 0 : n, h = t.width, o = void 0 === h ? 0 : h, r = t.height, c = void 0 === r ? 0 : r;
            this.ctx.drawImage(e, s, a, o, c);
        },
        drawText: function(e) {
            var i = e.MaxLineNumber, a = void 0 === i ? 2 : i, n = e.breakWord, s = void 0 !== n && n, h = e.color, o = void 0 === h ? "black" : h, r = e.content, c = void 0 === r ? "" : r, d = e.textBefore, g = void 0 === d ? "" : d, l = e.textAfter, x = void 0 === l ? "" : l, v = e.textBeforeFont, w = void 0 === v ? 16 : v, f = e.textAfterFont, m = void 0 === f ? 16 : f, u = e.fontSize, p = void 0 === u ? 16 : u, T = e.top, I = void 0 === T ? 0 : T, L = e.left, F = void 0 === L ? 0 : L, y = e.lineHeight, S = void 0 === y ? 20 : y, b = e.textAlign, P = void 0 === b ? "left" : b, k = e.width, D = e.bolder, C = void 0 !== D && D, R = e.textDecoration, _ = void 0 === R ? "none" : R;
            if (this.ctx.setTextBaseline("top"), this.ctx.setTextAlign(P), this.ctx.setFillStyle(o), 
            this.ctx.setFontSize(p), s) {
                for (var z = "", A = I, M = 1, O = 0; O < c.length; O++) if (z += [ c[O] ], this.ctx.measureText(z).width > k) {
                    if (M === a && O !== c.length) {
                        z = z.substring(0, z.length - 1) + "...", this.ctx.fillText(z, F, A), this.drawTextLine(F, A, _, o, p, z), 
                        z = "";
                        break;
                    }
                    this.ctx.fillText(z, F, A), this.drawTextLine(F, A, _, o, p, z), z = "", A += S, 
                    M++;
                }
                this.ctx.fillText(z, F, A), this.drawTextLine(F, A, _, o, p, z);
            } else {
                var j = F, B = String(g);
                if (B) {
                    this.ctx.setFontSize(w);
                    var E = this.ctx.measureText(B), H = 0, N = String(x);
                    N && void 0 != N && (this.ctx.setFontSize(m), H = this.ctx.measureText(N).width), 
                    j = F + E.width + H, this.ctx.setFontSize(p);
                }
                if (F < 0) {
                    var W = String(c);
                    j = 750 - this.ctx.measureText(W).width + F;
                }
                this.ctx.fillText(c, j, I);
            }
            C && this.drawText(t({}, e, {
                left: F + .3,
                top: I + .3,
                bolder: !1,
                textDecoration: "none"
            }));
        },
        drawTextLine: function(t, e, i, a, n, s) {
            "underline" === i ? this.drawRect({
                background: a,
                top: e + 1.2 * n,
                left: t - 1,
                width: this.ctx.measureText(s).width + 3,
                height: 1
            }) : "line-through" === i && this.drawRect({
                background: a,
                top: e + .6 * n,
                left: t - 1,
                width: this.ctx.measureText(s).width + 3,
                height: 1
            });
        },
        drawRect: function(t) {
            var e = t.background, i = t.top, a = void 0 === i ? 0 : i, n = t.left, s = void 0 === n ? 0 : n, h = t.width, o = void 0 === h ? 0 : h, r = t.height, c = void 0 === r ? 0 : r;
            this.ctx.setFillStyle(e), this.ctx.fillRect(s, a, o, c);
        },
        getImageInfo: function(t) {
            var e = this;
            return new Promise(function(i, a) {
                e.cache[t] ? i(e.cache[t]) : new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/).test(t) ? wx.getImageInfo({
                    src: t,
                    complete: function(n) {
                        "getImageInfo:ok" === n.errMsg ? (e.cache[t] = n.path, i(n.path)) : a(new Error("getImageInfo fail"));
                    }
                }) : (e.cache[t] = t, i(t));
            });
        },
        saveImageToLocal: function() {
            var t = this, e = this.data, i = e.width, a = e.height;
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: i,
                height: a,
                canvasId: "canvasdrawer",
                success: function(e) {
                    "canvasToTempFilePath:ok" === e.errMsg && (t.setData({
                        showCanvas: !1,
                        isPainting: !1,
                        imageList: [],
                        tempFileList: []
                    }), t.triggerEvent("getImage", {
                        tempFilePath: e.tempFilePath
                    }));
                },
                fail: function(t) {}
            }, this);
        }
    }
});