
import Log from './../xf/util/Log';
import MdGame from './../module/MdGame';
const {ccclass, property} = cc._decorator;


@ccclass
export default class CoinN extends cc.Component 
{



    @property(cc.Label)
    number: cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;


    @property(cc.Vec2)
    upPostion: cc.Vec2 = null;

    @property({displayName:"金币向上移动时间"})
    coinUpDelayTime: number = 0;

    @property({displayName:"金币选中后大小"})
    chooseScale: number = 0;

    public num:number=0;

    public is_know:boolean=true;


    protected start(): void {

       
        
    }

    public setNum(num:number)
    {
        this.num=num;

        this.updateView();

    }

    public getNum():number
    {
       return this.num;
    }

    public setKnow(flag)
    {
        this.is_know=flag;

        this.updateView();
    }

    public getKnow()
    {
        return this.is_know;
    }

    private playAni()
    {
        cc.tween(this.node)
          .to(0.05,{x:-10})
          .to(0.05,{x:10})
          .to(0.05,{x:-10})
          .to(0.05,{x:0})
          .call(()=>{this.moveCall()})
          .start()
    }


    private updateView()
    {
        if(this.is_know==true)
        {
            this.icon.spriteFrame=MdGame.inst.getNumBg(this.num);
        }
        else
        {
            this.icon.spriteFrame=MdGame.inst.coin_gary_bg;
        }

        this.number.string=this.num+"";
    }


    private moveCall()
    {
        Log.error("抖动结束");

    }

    public 


}












// var e = require;
// var t = module;
// var n = exports;
// var o,
//     i =
//         (this && this.__extends) ||
//         ((o = function (e, t) {
//             return (o =
//                 Object.setPrototypeOf ||
//                 ({__proto__: []} instanceof Array &&
//                     function (e, t) {
//                         e.__proto__ = t;
//                     }) ||
//                 function (e, t) {
//                     for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
//                 })(e, t);
//         }),
//         function (e, t) {
//             function n() {
//                 this.constructor = e;
//             }
//             o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
//         }),
//     r =
//         (this && this.__decorate) ||
//         function (e, t, n, o) {
//             var i,
//                 r = arguments.length,
//                 a = r < 3 ? t : null === o ? (o = Object.getOwnPropertyDescriptor(t, n)) : o;
//             if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
//             else
//                 for (var s = e.length - 1; 0 <= s; s--)
//                     (i = e[s]) && (a = (r < 3 ? i(a) : 3 < r ? i(t, n, a) : i(t, n)) || a);
//             return 3 < r && a && Object.defineProperty(t, n, a), a;
//         },
//     a =
//         (this && this.__awaiter) ||
//         function (e, a, s, c) {
//             return new (s = s || Promise)(function (n, t) {
//                 function o(e) {
//                     try {
//                         r(c.next(e));
//                     } catch (e) {
//                         t(e);
//                     }
//                 }
//                 function i(e) {
//                     try {
//                         r(c.throw(e));
//                     } catch (e) {
//                         t(e);
//                     }
//                 }
//                 function r(e) {
//                     var t;
//                     e.done
//                         ? n(e.value)
//                         : ((t = e.value) instanceof s
//                               ? t
//                               : new s(function (e) {
//                                     e(t);
//                                 })
//                           ).then(o, i);
//                 }
//                 r((c = c.apply(e, a || [])).next());
//             });
//         },
//     s =
//         (this && this.__generator) ||
//         function (n, o) {
//             var i,
//                 r,
//                 a,
//                 s = {
//                     label: 0,
//                     sent: function () {
//                         if (1 & a[0]) throw a[1];
//                         return a[1];
//                     },
//                     trys: [],
//                     ops: []
//                 },
//                 e = {next: t(0), throw: t(1), return: t(2)};
//             return (
//                 "function" == typeof Symbol &&
//                     (e[Symbol.iterator] = function () {
//                         return this;
//                     }),
//                 e
//             );
//             function t(t) {
//                 return function (e) {
//                     return (function (t) {
//                         if (i) throw new TypeError("Generator is already executing.");
//                         for (; s; )
//                             try {
//                                 if (
//                                     ((i = 1),
//                                     r &&
//                                         (a =
//                                             2 & t[0]
//                                                 ? r.return
//                                                 : t[0]
//                                                 ? r.throw || ((a = r.return) && a.call(r), 0)
//                                                 : r.next) &&
//                                         !(a = a.call(r, t[1])).done)
//                                 )
//                                     return a;
//                                 switch (((r = 0), (t = a ? [2 & t[0], a.value] : t)[0])) {
//                                     case 0:
//                                     case 1:
//                                         a = t;
//                                         break;
//                                     case 4:
//                                         return s.label++, {value: t[1], done: !1};
//                                     case 5:
//                                         s.label++, (r = t[1]), (t = [0]);
//                                         continue;
//                                     case 7:
//                                         (t = s.ops.pop()), s.trys.pop();
//                                         continue;
//                                     default:
//                                         if (
//                                             !(a = 0 < (a = s.trys).length && a[a.length - 1]) &&
//                                             (6 === t[0] || 2 === t[0])
//                                         ) {
//                                             s = 0;
//                                             continue;
//                                         }
//                                         if (3 === t[0] && (!a || (t[1] > a[0] && t[1] < a[3]))) {
//                                             s.label = t[1];
//                                             break;
//                                         }
//                                         if (6 === t[0] && s.label < a[1]) {
//                                             (s.label = a[1]), (a = t);
//                                             break;
//                                         }
//                                         if (a && s.label < a[2]) {
//                                             (s.label = a[2]), s.ops.push(t);
//                                             break;
//                                         }
//                                         a[2] && s.ops.pop(), s.trys.pop();
//                                         continue;
//                                 }
//                                 t = o.call(n, s);
//                             } catch (e) {
//                                 (t = [6, e]), (r = 0);
//                             } finally {
//                                 i = a = 0;
//                             }
//                         if (5 & t[0]) throw t[1];
//                         return {value: t[0] ? t[1] : void 0, done: !0};
//                     })([t, e]);
//                 };
//             }
//         };
// Object.defineProperty(n, "__esModule", {value: !0});
// var c,
//     l = e("index"),
//     u = e("sound"),
//     p = e("player-coin"),
//     h = e("player-info"),
//     d = e("player-theme"),
//     f = e("game"),
//     t = cc._decorator,
//     e = t.ccclass,
//     t = t.property,
//     e =
//         ((c = cc.Component),
//         i(m, c),
//         (m.prototype.start = function () {
//             var n = this;
//             this.coinAnim.on(cc.Animation.EventType.FINISHED, function (e, t) {
//                 "CoinShake" == t.name && n.moveCall();
//             });
//         }),
//         (m.prototype.getData = function () {
//             var e = new h.saveCoinData();
//             return this.isUnknown && (e.isUn = !0), (e.num = this.curNum), e;
//         }),
//         (m.prototype.getIsUnknown = function () {
//             return this.isUnknown;
//         }),
//         (m.prototype.setIsUnknown = function (e) {
//             !e && this.isUnknown && this.showNumber(), (this.isUnknown = e);
//         }),
//         (m.prototype.getIdx = function () {
//             return this.curIdx;
//         }),
//         (m.prototype.loadCoinLabel = function () {
//             return a(this, void 0, void 0, function () {
//                 var t, n;
//                 return s(this, function (e) {
//                     switch (e.label) {
//                         case 0:
//                             return (
//                                 (t = d.playerTheme.getCoinLabelNames()),
//                                 this.curNum - 1 < 0 || this.curNum - 1 >= t.length
//                                     ? (console.error("loadCoinLabel error this.curNum:", this.curNum), [2])
//                                     : ((n = t[this.curNum - 1]), [4, l.ResUtil.loadSpritFrame("Texture/" + n)])
//                             );
//                         case 1:
//                             return (n = e.sent()), (this.label.spriteFrame = n), (this.label.node.active = !0), [2];
//                     }
//                 });
//             });
//         }),
//         (m.prototype.showNumber = function () {
//             var e = Math.floor((this.curNum - 1) / this.coinSpriteFrames.length),
//                 t = this.curNum - e * this.coinSpriteFrames.length;
//             this.setIconFrame(this.coinSpriteFrames[t - 1]),
//                 this.label && ((this.label.node.active = !1), this.loadCoinLabel()),
//                 this.number &&
//                     ((e = f.default.ins.getColors()),
//                     (this.number.node.color = e[t - 1]),
//                     (this.number.node.active = !0),
//                     (this.number.string = this.curNum.toString()));
//         }),
//         (m.prototype.init = function (e) {
//             (this.isUnknown = e.isUnknown),
//                 (this.node.scale = 1),
//                 (this.curIdx = e.cellIdx),
//                 this.setNum(e.num),
//                 (this.initPostion = new cc.Vec2(this.node.position.x, this.node.position.y)),
//                 (this.initScale = 1),
//                 (this.isTouch = !1),
//                 (this.isChoose = !1);
//         }),
//         (m.prototype.setNum = function (e) {
//             (this.curNum = e),
//                 this.isUnknown
//                     ? (this.label && (this.label.node.active = !1),
//                       this.number && (this.number.node.active = !1),
//                       this.setIconFrame(this.coinGraySpriteFrame))
//                     : this.showNumber(),
//                 p.playerCoin.setCoinMaxNumber(this.curNum);
//         }),
//         (m.prototype.getNum = function () {
//             return this.curNum;
//         }),
//         (m.prototype.getIsTouch = function () {
//             return this.isTouch;
//         }),
//         (m.prototype.setTouch = function (e) {
//             this.isTouch = e;
//         }),
//         (m.prototype.moveCall = function () {
//             var e = this,
//                 t = this.isChoose ? this.chooseScale : this.initScale,
//                 n = this.isChoose ? this.initPostion.add(this.upPostion) : this.initPostion;
//             this.scaleAndMoveTo(t, n, this.coinUpDelayTime, 0, function () {
//                 e.moveEnd && e.moveEnd();
//             });
//         }),
//         (m.prototype.setChoose = function (e, t, n) {
//             this.isTouch && this.initScale && this.isChoose != e
//                 ? ((this.isChoose = e), (this.moveEnd = t), n ? this.coinAnim.play("CoinShake") : this.moveCall())
//                 : ((this.isChoose = e), t && t());
//         }),
//         (m.prototype.scaleAndMoveTo = function (e, t, n, o, i) {
//             void 0 === o && (o = 0),
//                 cc
//                     .tween(this.node)
//                     .delay(o)
//                     .to(n, {scale: e, x: t.x, y: t.y})
//                     .call(function () {
//                         i && i();
//                     })
//                     .start();
//         }),
//         (m.prototype.moveToCubic = function (e, t, n, o) {
//             void 0 === n && (n = 0),
//                 (this.node.scale = this.initScale),
//                 cc
//                     .tween(this.node)
//                     .delay(n)
//                     .to(t, {x: e.x, y: e.y}, {easing: "cubicOut"})
//                     .call(function () {
//                         o && o();
//                     })
//                     .start();
//         }),
//         (m.prototype.moveTo = function (e, t, n, o, i) {
//             void 0 === n && (n = 0),
//                 void 0 === i && (i = !1),
//                 (this.node.scale = this.initScale),
//                 cc
//                     .tween(this.node)
//                     .delay(n)
//                     .call(function () {
//                         i &&
//                             ("coin" === d.playerTheme.getCurThemeName()
//                                 ? u.sound.play(u.Sound.PLACECOIN)
//                                 : u.sound.play(u.Sound.MJ_PLACECOIN));
//                     })
//                     .to(t, {x: e.x, y: e.y}, {easing: "quintOut"})
//                     .call(function () {
//                         o && o();
//                     })
//                     .start();
//         }),
//         (m.prototype.setIconColor = function (e) {
//             this.icon.node.color = e;
//         }),
//         (m.prototype.setIconFrame = function (e) {
//             this.icon.spriteFrame = e;
//         }),
//         (m.prototype.reseatPosition = function () {
//             this.node.setPosition(this.initPostion), (this.node.scale = this.initScale);
//         }),
//         (m.prototype.reseat = function (e, t, n, o) {
//             (this.curIdx = e),
//                 (this.isTouch = t),
//                 (this.isChoose = n),
//                 (this.initPostion = new cc.Vec2(this.node.position.x, this.node.position.y)),
//                 (this.node.scale = this.initScale),
//                 o && this.setNum(o);
//         }),
//         (m.prototype.hide = function (e, t) {
//             var n = this;
//             cc.tween(this.node)
//                 .delay(e)
//                 .call(function () {
//                     (n.node.active = !1), t && t();
//                 })
//                 .start();
//         }),
//         (m.prototype.moveBy = function (e, t, n, o) {
//             cc.tween(this.node)
//                 .delay(e)
//                 .by(t, {x: n.x, y: n.y})
//                 .call(function () {
//                     o && o();
//                 })
//                 .start();
//         }),
//         (m.prototype.show = function (e, t, n, o) {
//             void 0 === n && (n = 0),
//                 (this.node.scale = 0),
//                 cc
//                     .tween(this.node)
//                     .delay(n)
//                     .to(e, {scale: this.initScale + 0.1})
//                     .to(t, {scale: this.initScale})
//                     .delay(0.3)
//                     .call(function () {
//                         o && o();
//                     })
//                     .start();
//         }),
//         r([t(cc.Animation)], m.prototype, "coinAnim", void 0),
//         r([t(cc.Sprite)], m.prototype, "label", void 0),
//         r([t(cc.Label)], m.prototype, "number", void 0),
//         r([t(cc.Sprite)], m.prototype, "icon", void 0),
//         r([t(cc.SpriteFrame)], m.prototype, "coinGraySpriteFrame", void 0),
//         r([t([cc.SpriteFrame])], m.prototype, "coinSpriteFrames", void 0),
//         r([t(cc.Vec2)], m.prototype, "upPostion", void 0),
//         r([t({displayName: "金币向上移动时间"})], m.prototype, "coinUpDelayTime", void 0),
//         r([t({displayName: "金币选中后大小"})], m.prototype, "chooseScale", void 0),
//         r([e], m));
// function m() {
//     var e = (null !== c && c.apply(this, arguments)) || this;
//     return (
//         (e.coinAnim = null),
//         (e.label = null),
//         (e.number = null),
//         (e.icon = null),
//         (e.coinGraySpriteFrame = null),
//         (e.coinSpriteFrames = []),
//         (e.upPostion = new cc.Vec2(0, 20)),
//         (e.coinUpDelayTime = 1),
//         (e.chooseScale = 1.2),
//         (e.curNum = 0),
//         (e.curIdx = 0),
//         (e.isTouch = !1),
//         (e.isChoose = !1),
//         (e.initPostion = null),
//         (e.initScale = null),
//         (e.isUnknown = !1),
//         (e.moveEnd = null),
//         e
//     );
// }
// n.default = e;
