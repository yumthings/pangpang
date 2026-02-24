const {ccclass, property} = cc._decorator;
import HttpImg from '../xf/manager/HttpImg';
import PrefabManager from '../xf/manager/PrefabManager';
import Log from '../xf/util/Log';
import ViewBase from '../xf/ViewBase';
import TargetView from './../com/TargetView';
import ProgressView from './../com/ProgressView';
import GuidePanel from '../com/GuidePanel';
import CellPanel from './../com/CellPanel';
import NumsWeight from '../data/CountsWeight';
import TypesWeight from './../data/TypesWeight';
import SoundManager from './../manager/SoundManager';
import Sound from './../struct/Sound';
import AdVideo from '../ad/AdVideo';
import LData from './../manager/LData';
import MdTip from './MdTip';
import MdSet from './MdSet';
import Plat from './../xf/Palt';

@ccclass
export default class MdGame extends ViewBase {

    private static _inst:MdGame;

    public static get inst()
    {
        if(this._inst==null)
        {
            let v=cc.instantiate(PrefabManager.getPrefab("GameView"));

            this._inst=v.getComponent(MdGame);
        }

        return this._inst;
    }


    @property([cc.Color])
    colors: Array<cc.Color> = new Array();

    @property([cc.SpriteFrame])
    coin_bgs: Array<cc.SpriteFrame> = new Array();

    @property(cc.SpriteFrame)
    coin_gary_bg: cc.SpriteFrame = null;


    @property(cc.Node)
    btn_fp: cc.Node = null;  //发牌按钮

    @property(cc.Node)
    btn_hc: cc.Node = null;  //合成按钮


    @property(cc.Node)
    guide: cc.Node = null;  //引导

    @property(cc.Node)
    over_mask: cc.Node = null;  //结束遮罩

    @property(cc.Label)
    lv_txt: cc.Label = null;  //结束遮罩



    start()
    {
       NumsWeight.init();
       TypesWeight.init();
       // 新增：进入游戏场景时开始播放背景音乐
       SoundManager.playBgm(Sound.bgm);

        
        this.startGame();

      
    }

    public startGame()
    {

        this.lv_txt.string="第 "+LData.lv+" 关"
        

        ProgressView.inst.reSet();

        CellPanel.inst.startGame();

        this.scheduleOnce(()=>{

            let num = ProgressView.inst.getTargetNum();

            TargetView.inst.paly(num);
        },2)
    }

    public reStartGame()
    {
        MdGame.inst.over_mask.active=true;

        cc.tween(this.node)
        .delay(1)
        .call(()=>{
            MdTip.inst.showTip("释放压力,重新开始")
        })
        .delay(0.5)
        .call(()=>{
          //  LData.lv=1;
            LData.celldatas="";
            CellPanel.inst.reset();
            MdGame.inst.startGame();
        })
        .delay(0.5)
        .call(()=>{
           
            MdGame.inst.onFaPai();
            MdGame.inst.over_mask.active=false;
        })
        .start();
    }


    public onFaPai()
    {
        SoundManager.playSound(Sound.giveCoin);
        CellPanel.inst.onFaPai();
    }

    //合成
    public onHeCheng()
    {
        SoundManager.playSound(Sound.merge);
        CellPanel.inst.merge();

        Plat.vibrate(1);
    }

    public onXiPai()
    { 
        
        AdVideo.show({

            onVideoAdClose:(isend:boolean)=>{

                if(isend==false)
                {
                    return ;
                }

                CellPanel.inst.xiPai();

            },
            onVideoAdError:()=>{

                CellPanel.inst.xiPai();

            }
    })

       
    }

    public onSet(){

        SoundManager.playSound(Sound.click);
        MdSet.inst.showView();
    }

    public onRank(){

        SoundManager.playSound(Sound.click);

        MdTip.inst.showTip("功能正在开发中");
    }

    public onGm()
    {
        CellPanel.inst.gm_test();
    }


    public getNumBg(num:number):cc.SpriteFrame
    {
        return this.coin_bgs[ (num-1)%this.coin_bgs.length]
    }



}



// (C.prototype.onOperTap = function (e) {
//     var t = this;
//     null != e &&
//         null != e.action &&
//         (p.default.unlocknNumber == e.action && null != e.data
//             ? (this.setTargetLabel(!1), this.showShareBtn())
//             : p.default.nextLevel == e.action &&
//               null != e.data &&
//               (this.progress && (this.progress.reseatItem(), this.setTargetNumber(!1)),
//               l.platform.trackEvent("nextLevel", {level: g.playerInfo.getLevel()}),
//               this.showShareBtn()),
//         p.default.unlocknLast == e.action && null != e.data
//             ? this.progress &&
//               this.progress.lastTarget(function () {
//                   p.operEvent.emit({action: p.default.cloneCellLayer, data: {}});
//               })
//             : p.default.targetAnim == e.action
//             ? null != e.data &&
//               null != e.data.delayTime &&
//               this.scheduleOnce(function () {
//                   t.target && t.target.playAnim();
//               }, e.data.delayTime)
//             : p.default.restartWarTime === e.action
//             ? this.warTime.reset()
//             : p.default.startWarTime === e.action
//             ? this.warTime.timeStart()
//             : p.default.saveWarTime === e.action && this.warTime.saveTime());
// }),



// (C.prototype.setTargetNumber = function (e) {
//     this.targetNumbers = g.playerInfo.getTargetNumbers();
//     var t = this.progress.getTargetItemLength();
//     this.targetNumbers.length === t
//         ? (this.progress.setTargetNumbers(this.targetNumbers), this.setTargetLabel(e))
//         : console.log("length error:", this.targetNumbers.length, t);
// }),
// (C.prototype.setTargetLabel = function (e) {
//     var n, o;
//     null != this.targetNumbers
//         ? ((o = n = 0),
//           g.playerInfo.getCurTargetNumber(function (e, t) {
//               (n = e), (o = t);
//           }),
//           this.target && (this.target.loadTargetLabel(n), this.target.loadTargetLabelBg(n)),
//           this.progress.setCurTargetNumber(o, e))
//         : console.log("this.targetNumber.error..", this.targetNumbers);
// }),
