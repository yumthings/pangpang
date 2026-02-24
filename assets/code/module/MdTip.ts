const {ccclass, property} = cc._decorator;
import PrefabManager from '../xf/manager/PrefabManager';
import ViewBase from '../xf/ViewBase';


@ccclass
export default class MdTip extends ViewBase {

    private static _inst:MdTip;

    public static get inst()
    {
        if(this._inst==null)
        {
            let v=cc.instantiate(PrefabManager.getPrefab("TipView"));

            this._inst=v.getComponent(MdTip);
        }

        return this._inst;
    }

    @property(cc.Label)
    tip:cc.Label=null;  //计时器

    private tw:cc.Tween;

    public showTip( str:string,time?:number)
    {

        this.tip.string=str;

        this.showView();

        this.node.zIndex=9999;
        this.node.x=cc.winSize.width/2;
        this.node.y=cc.winSize.height/2-80;
        this.node.opacity=0;


        if(this.tw ==null)
        {
            this.tw  = cc.tween(this.node)
            .to(0.4,{opacity:255,y:cc.winSize.height/2})
            .delay(1.5)
            .to(0.4,{opacity:0,y:cc.winSize.height/2+80})
            .call(()=>{
                this.hideView();
            })
            .start();
        }
        else
        {
            this.tw.stop();
            this.tw.start();
        }
      
    }

   


}