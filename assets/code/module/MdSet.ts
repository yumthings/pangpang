const {ccclass, property} = cc._decorator;
import PrefabManager from '../xf/manager/PrefabManager';
import ViewBase from '../xf/ViewBase';
import MdGame from './MdGame';
import LData from '../manager/LData';
import SoundManager from '../manager/SoundManager';
import Sound from './../struct/Sound';


@ccclass
export default class MdSet extends ViewBase {

    private static _inst:MdSet;

    public static get inst()
    {
        if(this._inst==null)
        {
            let v=cc.instantiate(PrefabManager.getPrefab("SetView"));

            this._inst=v.getComponent(MdSet);
        }

        return this._inst;
    }


    @property(cc.Node)
    yx_open: cc.Node = null;

    @property(cc.Node)
    yx_close: cc.Node = null;

    @property(cc.Node)
    zd_open: cc.Node = null;

    @property(cc.Node)
    zd_close: cc.Node = null;

    @property(cc.Node)
    child: cc.Node =null;


    public showView(data?: any): void {

        super.showView();

      
        this.showAni();

        this.updateBtn();
    }

    public showAni()
    {
        this.child.scale=0;

        cc.tween(this.child)
        .to(0.3,{scale:1})
        .start();
    }

    //重新开始
    public onRestart()
    {        
        SoundManager.playSound(Sound.click);
        
         this.hideView();

         MdGame.inst.reStartGame();
    }

    //关闭
    public onClose()
    {
        SoundManager.playSound(Sound.click);

        this.hideView();     
         
    }

    public onSound()
    {
        SoundManager.playSound(Sound.click);
        LData.yx=!LData.yx;
        this.updateBtn();
    }

    public onZhenDong()
    {
        SoundManager.playSound(Sound.click);
        LData.zd=!LData.zd;
        this.updateBtn();
    }

    public updateBtn()
    {
       this.yx_close.active=!LData.yx;
       this.yx_open.active=LData.yx;

       this.zd_close.active=!LData.zd;
       this.zd_open.active=LData.zd;
    }

   
}