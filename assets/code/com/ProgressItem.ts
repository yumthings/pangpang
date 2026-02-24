
import MdGame from './../module/MdGame';
import ProgressView from './ProgressView';
const {ccclass, property} = cc._decorator;


@ccclass
export default class ProgressItem extends cc.Component 
{



    @property(cc.Label)
    number: cc.Label = null;

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    protected onLoad(): void 
    {

    }


    public num:number;

    public setNum(num:number)
    {
        this.num=num;
        this.number.string = this.num.toString()
    }
  
    public getNum():number
    {
        return this.num;
    }
    
    private tween:cc.Tween;

    public updateView()
    {
        if(this.tween!=null)
        {
            this.tween.stop();
            this.tween=null;
            this.bg.node.parent.scale=0.5;
        }

        if(ProgressView.inst.getTargetNum()>this.num)
        {
            this.bg.spriteFrame=MdGame.inst.getNumBg(this.num);
        }
        else if(ProgressView.inst.getTargetNum()==this.num)
        {
            this.bg.spriteFrame=MdGame.inst.getNumBg(this.num);

            this.tween=cc.tween(this.bg.node.parent)
                          .to(0.5,{scale:0.6})
                          .to(0.5,{scale:0.5})
                          .union()
                          .repeatForever()
                          .start();
        }
        else
        {
            this.bg.spriteFrame=MdGame.inst.coin_gary_bg;
        }
    }

}