import ProgressItem from "./ProgressItem";
import LData from './../manager/LData';

const {ccclass, property} = cc._decorator;


@ccclass
export default class ProgressView extends cc.Component 
{


    @property([ProgressItem])
    targetItems: Array<ProgressItem> = new Array();

    @property(cc.Node)
    hg: cc.Node = null;  //皇冠

    @property(cc.Node)
    gh: cc.Node = null;  //光环

    // @property(cc.Node)
    // jt: cc.Node = null;  //箭头



    private static _inst:ProgressView;

    public static get inst()
    {
        return this._inst;
    }

    protected onLoad(): void {

        ProgressView._inst=this;

        
        
    }

    protected start(): void {
        
        cc.tween(this.hg)
          .to(0.5,{y:this.hg.y+10})
          .to(0.5,{y:this.hg.y})
          .union()
          .repeatForever()
          .start();

          cc.tween(this.gh)
          .to(5,{angle:-360})
          .call(()=>{
            this.gh.angle=0;
          })
          .union()
          .repeatForever()
          .start();

    }


    private nums:Array<number>;

    public reSet()
    {
        let lv=LData.lv;

        let s=6 *(lv-1)+1;

        this.nums=[s+4,s+5,s+6,s+8,s+9];
        this.curr_target_index=0;

        for(let i=0;i<this.targetItems.length;i++)
        {
           this.targetItems[i].setNum(this.nums[i]);

           this.targetItems[i].updateView();
        }
    }


    public getTargetNode(index):cc.Node
    {
       return this.targetItems[index].node;
    }

    public getMinTargetNum():number
    {
        return this.nums[0];
    }

    public getMaxTargetNum():number
    {
        return this.nums[this.nums.length-1];
    }

    public isOver(num):boolean
    {
        if(this.nums[this.nums.length-1]==num)
        {
            return true;
        }

        return false;
    }

    private curr_target_index;

    public setMaxNum(max)
    {
        if(max<this.nums[this.curr_target_index])
        {
            return;
        }

        for(var i=0;i<this.nums.length;i++)
        {
           if(this.nums[i]>max)
           {
              this.curr_target_index=i; 
              
              for(let k=0;k<this.targetItems.length;k++)
              {
                 this.targetItems[k].updateView();
              }

              break;
           }
        }
    }

    public getTargetNum()
    {
        return this.nums[this.curr_target_index];
    }
    public getTargetIndex()
    {
        return this.curr_target_index;
    }





}