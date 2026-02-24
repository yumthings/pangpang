
import MdGame from './../module/MdGame';
const {ccclass, property} = cc._decorator;


@ccclass
export default class TargetView extends cc.Component 
{

    // @property(cc.Sprite)
    // targetLabel: cc.Sprite = null;

    @property(cc.Label)
    num: cc.Label = null;

    @property(cc.Sprite)
    numbg: cc.Sprite = null;


    @property(cc.Node)
    target: cc.Node = null;

    private static _inst:TargetView;

    public static get inst()
    {
        return this._inst;
    }

    protected onLoad(): void 
    {
        TargetView._inst=this;
        this.node.active = false;
    }

    public curr:number=0;

    public paly(num1:number)
    {
        if(num1 ==this.curr)
        {
           return;
        }

        this.curr=num1;

        this.num.string=""+num1;

        let arr=MdGame.inst.coin_bgs;
        this.numbg.spriteFrame = arr[ (num1-1)%arr.length]

        this.node.active=true;
        this.target.opacity=0;
        this.target.y=-70;

        cc.tween(this.target)
          .to(0.3,{y:0,opacity:255})
          .delay(2.5)
          .to(0.3,{y:70,opacity:0})
          .call(()=>{
            this.node.active=false;
          })
          .start();
          
    }
}
