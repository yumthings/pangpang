const {ccclass, property} = cc._decorator;
import PrefabManager from '../xf/manager/PrefabManager';
import ViewBase from '../xf/ViewBase';
import MdGame from './MdGame';
import LData from '../manager/LData';
import SoundManager from '../manager/SoundManager';


@ccclass
export default class MdWin extends ViewBase {

    private static _inst:MdWin;

    public static get inst()
    {
        if(this._inst==null)
        {
            let v=cc.instantiate(PrefabManager.getPrefab("WinView"));

            this._inst=v.getComponent(MdWin);
        }

        return this._inst;
    }


    @property(cc.Label)
    t_time: cc.Label = null;

  
 
    @property(cc.Node)
    child: cc.Node =null;


    public showView(data?: any): void {

        super.showView();

      
        this.showAni();
    }

    public showAni()
    {
        this.child.scale=0;

        cc.tween(this.child)
        .to(0.5,{scale:1})
        .start();
    }

    //重新开始
    public onRestart()
    {        
        SoundManager.playSound("btn");
        
         this.hideView();

         MdGame.inst.startGame();
    }

    //关闭
    public onClose()
    {
        SoundManager.playSound("btn");

        this.hideView();      
    }
   
}