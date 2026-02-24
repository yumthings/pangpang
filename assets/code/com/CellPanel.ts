
import PrefabManager from './../xf/manager/PrefabManager';
import Cell from './Cell';
import EnumCellState from './../struct/EnumCellState';
import pfutil from '../xf/util/pfutil';
import LData from '../manager/LData';
import NumsWeight from '../data/CountsWeight';
import MdGame from './../module/MdGame';
import CoinN from './CoinN';
import ProgressView from './ProgressView';
import TargetView from './TargetView';
import Log from '../xf/util/Log';
import TypesWeight from './../data/TypesWeight';
import CellInfo from './../struct/CellInfo';
import SoundManager from './../manager/SoundManager';
import Sound from './../struct/Sound';
import GuidePanel from './GuidePanel';
import MdTip from './../module/MdTip';
import Plat from '../xf/Palt';
const {ccclass, property} = cc._decorator;


@ccclass
export default class CellPanel extends cc.Component 
{


    private static _inst:CellPanel;

    public static get inst()
    {
        return this._inst;
    }



    @property(cc.Node)
    cellParent: cc.Node = null;

    @property(cc.Node)
    startNode: cc.Node = null;

    @property({displayName:"金币切换格子移动时间"})
    coinChangeDelayTime: number = 0;

    @property({displayName:"金币移动之间的延迟"})
    coinDelayTime: number = 0;

    @property({displayName:"发金币移动时间"})
    dealCoinTime: number = 0;

    @property({displayName:"发金币移动之间的延迟"})
    dealCoinDelayTime: number = 0;

    @property({displayName:"金币 洗牌 切换格子移动时间"})
    coinClearChangeDelayTime: number = 0;

    @property({displayName:"金币 洗牌 移动之间的延迟"})
    coinClearDelayTime: number = 0;

    @property({type:cc.Node, displayName:"发牌按钮"})
    btn_fp: cc.Node = null;

    @property({type:cc.Node,displayName:"合成按钮"})
    btn_hc: cc.Node = null;

    @property({type:cc.Node,displayName:"洗牌按钮"})
    btn_xp: cc.Node = null;

    public cells:Array<Cell>=new Array();
    public close_cells:Array<Cell>=new Array();
    public temps_cells:Array<Cell>=new Array();

    public curr_cell_count:number=5;

    public curr_max_card:number=0;
    public curr_min_card:number=1;

    public oper_flag:boolean=true;

    protected onLoad(): void {

        CellPanel._inst=this;

        for(let i=0;i<12;i++)
        {
           let node=cc.instantiate(PrefabManager.getPrefab("Cell"))
 
           this.cellParent.addChild(node);

           let cell=node.getComponent(Cell)

           this.cells.push(cell);
        }

        for(let i=5;i<9;i++)
        {
           this.close_cells.push(this.cells[i]);
        }

        for(let i=9;i<12;i++)
        {
           this.temps_cells.push(this.cells[i]);
        }

        for(let i=0;i<12;i++)
        {
           this.cells[i].init(i);
        }

        for(let i=0;i<5;i++)
        {
            this.cells[i].setState(EnumCellState.normal);
        }

        this.cells[5].setState(EnumCellState.lock_next);

        for(let i=6;i<9;i++)
        {
            this.cells[i].setState(EnumCellState.lock);
        }


        this.cells[9].setState(EnumCellState.temp_ad);
        this.cells[10].setState(EnumCellState.temp_ad);
        this.cells[11].setState(EnumCellState.temp_ad);
    }

    public reset()
    {

        for(let i=0;i<12;i++)
        {
            this.cells[i].setState(-1);
           this.cells[i].coin_items.length=0;
           this.cells[i].coinParent.removeAllChildren();
        }

        for(let i=0;i<5;i++)
        {
            this.cells[i].setState(EnumCellState.normal);
        }

        this.cells[5].setState(EnumCellState.lock_next);

        for(let i=6;i<9;i++)
        {
            this.cells[i].setState(EnumCellState.lock);
        }


        this.cells[9].setState(EnumCellState.temp_ad);
        this.cells[10].setState(EnumCellState.temp_ad);
        this.cells[11].setState(EnumCellState.temp_ad);
    }

    protected start(): void
    {
        if(LData.guide==1)
        {
            this.scheduleOnce(()=>{
                MdGame.inst.guide.active=true;
                GuidePanel.inst.startGuide();
            },0.1);
        }
    }


    public getCell(index):Cell
    {
         return this.cells[index];
    }

    public startGame()
    {

        if(LData.guide==1)
        {
            let info1=new CellInfo();
            
            info1.state=EnumCellState.normal;
            info1.nums.push(1);
            info1.nums.push(1);
            info1.nums.push(1);
            info1.nums.push(1);
            info1.nums.push(1);

            this.cells[0].setInfo(info1);
            this.cells[2].setInfo(info1);
        }
        else
        {
            this.restoreCells()
        }

       
       
        this.checkBtns();
    }

    //发牌
    public onFaPai()
    {
        this.banOper();
        
        this.downAllCoins();        

        this.getMaxCardNum();

       let map=new Map<number,number>();

       let havenums=new Map<number,boolean>();

       let nums1=Array();
       let nums2=Array();

       let cell_count=0;

       for(var i=0;i<this.cells.length;i++)
       {
           let cell=this.cells[i];

           let coins=cell.getAllCoins();

           if(coins!=null)
           {
             for(let k=0;k<coins.length;k++)
             {
                havenums.set(coins[k].getNum(),true);
             }
           }

           if(this.cells[i].getState()==EnumCellState.normal)
           {
              cell_count++;
           }
       }

       for(var i=0;i<cell_count;i++)
       {
          let can=this.cells[i].getCanAddCount();

          if(can>0)
          {
              map.set(i,can);

              if(can<10)
              {
                 nums1.push(i);
              }
              nums2.push(i);
          }         
         
       }

       //删掉一个
       if(map.size>1)
       {
          if(nums1.length>0)
          {
             map.delete(nums1[pfutil.random(0,nums1.length)]);
          }
          else
          {
             map.delete(nums2[pfutil.random(0,nums2.length)]);
          }
       }

    //    //保留六个
    //    while(map.size>6)
    //    {
    //       if(nums1.length>0)
    //       {
    //          map.delete(nums1[pfutil.random(0,nums1.length)]);
    //       }
    //       else
    //       {
    //          map.delete(nums2[pfutil.random(0,nums2.length)]);
    //       }
    //    }


       if(LData.guide==0)
       {
          this.startDeal(map,havenums);
       }
       else
       {
          this.startDealForGuide(); 
       }
    



    }

   //开始发牌
    private startDeal(map:Map<number,number>,havenums: Map<number,boolean>)
    {
        let target_index=ProgressView.inst.getTargetIndex();
        //获取每个单元可以得到几个牌
        map.forEach((val,key)=>{

            let count=NumsWeight.getCount(target_index);

            if(count>val)
            {
                count=val;
            }

            map.set(key,count);        
        })



        let sends:Map<number,Array<number>>=new Map();

        let sends_nums=this.getSendsNums(map.size);

      
        let sindex=0;

        

        map.forEach((val,key)=>{

           

            let cards:Array<number>=new Array();

            if(val==1)
            {
                cards.push(sends_nums[sindex]);
            }
            else
            {
                let weight_data=TypesWeight.getData(ProgressView.inst.getTargetIndex());
                let o=0;

                for(let i=2;i<val+1;i++)
                {
                    var r = Number(weight_data["val" + i]);
                    o < r && (o = r);
                }

                let nums=this.getSendsNums2(sends_nums[sindex],o);

                let arr:Array<Array<number>> =new Array(nums.length)

                for(let i=0;i<val;i++)
                {
                    let index = Number(weight_data["val" + (i + 1)]) - 1;

                    if(arr[index]==null)
                    {
                        arr[index]=new Array();
                    }
                    arr[index].push(nums[index]);
                }

                for(let i=0;i<arr.length;i++)
                {
                    for(let k=0;k<arr[i].length;k++)
                    {
                        cards.push(arr[i][k]);
                    }
                }
            }

            sends.set(key,cards);  
            
            sindex++;

            //  {
            //     for (var n = h.randCoinExcelgroup(v, m), o = 0, i = 2; i < e + 1; i++) {
            //         var r = Number(n["location" + i]);
            //         o < r && (o = r);
            //     }
            //     for (var a = 1 < d && 4 === e, s = h.randNeedNumbers(y[g], a ? 1 : o - 1), c = 0; c < e; c++) {
            //         var l,
            //             u,
            //             p = Number(n["location" + (c + 1)]) - 1;
            //         ((l = new w.coinData()).cellIdx = t),
            //             (l.num = s[p]),
            //             a && (c < 3 ? ((l.isUnknown = !0), (l.num = s[0])) : (l.num = s[1])),
            //             f.has(t) ? ((u = f.get(t)).push(l), f.set(t, u)) : f.set(t, [l]);
            //     }
            // }
        })


        //生成实体 播放动画

        //获取发牌按钮
        let fp_pos = MdGame.inst.btn_fp.parent.convertToWorldSpaceAR(MdGame.inst.btn_fp.position);

        let d=0.04;

       


        

        sends.forEach((val,key)=>{

            let index=0;

            for(let i=0;i<val.length;i++)
            {
               let cell= this.cells[key];

               let pos = cell.node.convertToNodeSpaceAR(fp_pos);

               let card=cc.instantiate(PrefabManager.getPrefab("Coin"));

               card.parent=cell.node;

               card.position=pos;

               let coin =card.getComponent(CoinN);

               coin.setNum(val[i]);

               let curr_count=cell.getHaveCoinCount();

               let y=Cell.getPosY(curr_count+index)+17;

               cc.tween(card)
                 .delay(d * index)
                 .to(0.4,{x:0,y:y},{easing:"quadOut"})
                 .call(()=>{
                    cell.AddCoin(coin);
                 })
                 .start();

                index++;

            }            
        })







        
    }

    //开始发牌
    private startDealForGuide()
    {
        
        let sends:Map<number,Array<number>>=new Map();

        let arr=[2,2,2];
        sends.set(0,arr);
        arr=[2,2,2,2];
        sends.set(1,arr);

        arr=[2];
        sends.set(2,arr);


        //获取发牌按钮
        let fp_pos = MdGame.inst.btn_fp.parent.convertToWorldSpaceAR(MdGame.inst.btn_fp.position);

        let d=0.05;

    

        sends.forEach((val,key)=>{

            let index=0;

            for(let i=0;i<val.length;i++)
            {
               let cell= this.cells[key];

               let pos = cell.node.convertToNodeSpaceAR(fp_pos);

               let card=cc.instantiate(PrefabManager.getPrefab("Coin"));

               card.parent=cell.node;

               card.position=pos;

               let coin =card.getComponent(CoinN);

               coin.setNum(val[i]);

               let curr_count=cell.getHaveCoinCount();

               let y=Cell.getPosY(curr_count+index)+17;

               cc.tween(card)
                 .delay(d * index)
                 .to(0.5,{x:0,y:y},{easing:"quadOut"})
                 .call(()=>{
                    cell.AddCoin(coin);
                 })
                 .start();

                index++;

            }            
        })

        
    }

    public getSendsNums(count):Array<number>
    {
       let arr:Array<number>=new Array();

       let min=ProgressView.inst.getMinTargetNum()-4;
       let max=this.curr_max_card;

       if(max<ProgressView.inst.getMinTargetNum())
       {
           max=ProgressView.inst.getMinTargetNum();
       }

       for(let i=min;i<max;i++)
       {
          arr.push(i);
       }

       while(arr.length<count)
       {
           arr.push(pfutil.random(min,max));
       }

       pfutil.shuffle(arr);

       return arr;
    }

    public getSendsNums2(num,group):Array<number>
    {
       let arr:Array<number>=new Array();

       let min=ProgressView.inst.getMinTargetNum()-4;
       let max=this.curr_max_card;

       if(max<ProgressView.inst.getMinTargetNum())
       {
           max=ProgressView.inst.getMinTargetNum();
       }
       
       arr.push(num);

       while(arr.length<group)
       {
           let temp=pfutil.random(min,max);

           if(temp!=num)
           {
             arr.push(temp);
           }
       }

       return arr;
    }

    //弹起的单元
    public up_cell:Cell=null;

    public cellClick(cell:Cell)
    {
         if(this.up_cell==null)
         {
            if(cell.getLastCoinNum() == 0 )
            {
                return ; 
            }

            this.up_cell=cell;

            cell.upCoins();
         }
         else if(this.up_cell==cell)
         {
            this.up_cell=null;

            cell.downCoins(1);

            if(cell.canMerge()==true)
            {
                this.mergeOne(cell);
            }

         }
         else if(this.up_cell!=cell)
         {
            if(cell.getCanAddCount()==0)
            {
                this.up_cell.downCoins(2);
                this.up_cell=null;
            }
            else if(cell.getLastCoinNum() == 0 || cell.getLastCoinNum() == this.up_cell.getLastCoinNum())
            {
                //可以移动过去
                this.moveToCell(this.up_cell,cell);
                this.up_cell.downCoins(1);
                this.up_cell=null;
            }
            else
            {              
                this.up_cell.downCoins(2);
                this.up_cell=null;
            }
         }
    }

    public tempCellClick(cell:Cell)
    {
       cell.openTempPost();
    }

    //合并
    public merge()
    {
        this.banOper();

        this.downAllCoins(); 
        this.up_cell=null;   
        
        let count=0;

        for(let i=0;i<this.cells.length;i++)
        {
            if(this.cells[i].canMerge()==true)
            {
                count++;
                this.cells[i].merge();
            }           
        }        
    }

     //合并一个
     public mergeOne(cell:Cell)
     {
         this.banOper();
 
         cell.merge();

         SoundManager.playSound(Sound.merge);
         Plat.vibrate(1);               
     }

    //洗牌
    public xiPai()
    {

        SoundManager.playSound(Sound.resetStart);

        this.downAllCoins();       
        
        this.btn_xp.active=false;
        this.banOper();

        //先将所有问号去掉


        let map:Map<number,Array<CoinN>>=new Map();

        let temp_cells:Array<Cell>=[];

        let nums:Array<number>=[];

        for(let i=0;i<this.cells.length;i++)
        {
            if(this.cells[i].getState()!=EnumCellState.normal)
            {
                continue;
            }

            for(let k=0;k<this.cells[i].coin_items.length;k++)
            {
                let coin=this.cells[i].coin_items[k];

                let num=coin.getNum();

                if(map.has(num)==false)
                {
                    map.set(num,new Array());
                }

                map.get(num).push(coin);

                if(nums.indexOf(num)==-1)
                {
                    nums.push(num);
                }
            }

      
            temp_cells.push(this.cells[i]);
            this.cells[i].coin_items.length=0;
        }

        nums.sort((a,b)=>a-b);

        while(nums.length>temp_cells.length)
        {
             let num = nums.shift();

         
            let arr=map.get(num);

            for(let i=0;i<arr.length;i++)
            {
                arr[i].node.parent=null;
            }
             
        }

        for(let i=0;i<nums.length;i++)
        {
            let arr=map.get(nums[i]);

            for(let k=0;k<arr.length;k++)
            {
                let coin=arr[k];

                if(k<10)
                {
                    let y=Cell.getPosY(k);

                    let wpos1=coin.node.parent.convertToWorldSpaceAR(coin.node.position);
                    let pos1=this.node.convertToNodeSpaceAR(wpos1);
        
                    coin.node.parent=this.node;
                    coin.node.position=pos1;
        
                    let wpos2=temp_cells[i].coinParent.parent.convertToWorldSpaceAR(temp_cells[i].coinParent.position);
                    let pos2=this.node.convertToNodeSpaceAR(wpos2);
        
                    cc.tween(coin.node)
                    .delay(0.02*k)
                    .to(0.4,{x:pos2.x,y:pos2.y+y},{easing:"quadOut"})
                    .call(()=>{
                        temp_cells[i].AddCoin(coin);
                    })
                    .start();
                }
                else
                {
                    coin.node.parent=null;
                }
            }
        }
    }


    //检测合并
    public checkMerge():boolean
    {
        let flag:boolean=false;
        
       for(let i=0;i<this.cells.length;i++)
       {
          if(this.cells[i].checkMerge()==true)
          {
              flag=true;
          }
       }

       return flag;
    }

    //检测洗牌
    public checkXiPai():boolean
    {
        let count = 0;

        for(let i=0;i<this.cells.length;i++)
        {
            if(this.cells[i].getState()==EnumCellState.normal)
            {
                count += this.cells[i].getCanAddCount();
            }
          
        }

        return count>8?false:true;
    }

    public downAllCoins()
    {
        //放下筹码
        for(var i=0;i<this.cells.length;i++)
        {
            let cell=this.cells[i];
            cell.downCoins(1);
        }
    }

    //获取最大牌
    public getMaxCardNum()
    {
        let max:number =0 ;

       for(var i=0;i<this.cells.length;i++)
       {
           let cell=this.cells[i];

           let coins=cell.getAllCoins();

           if(coins!=null)
           {
             for(let k=0;k<coins.length;k++)
             {
                 if(max<coins[k].getNum())
                 {
                    max=coins[k].getNum();
                 }
             }
           }
       }

       if(max<5)
       {
          max=5;
       }

       this.curr_max_card=max;
    }

    //移动筹码
    public moveToCell(source:Cell,target:Cell)
    {
        let max_move = target.getCanAddCount();


        let can_move=source.getLastCoinCount();

        if(max_move<can_move)
        {
            can_move=max_move;
        }


        let curr_count=target.getHaveCoinCount();

        let start=source.coin_items.length-can_move;

        let arr=[];

        for(let i=0;i<can_move;i++)
        {
            let y=Cell.getPosY(curr_count+i);

            let coin=source.coin_items[start];
            source.coin_items.splice(start,1);

            let wpos1=coin.node.parent.convertToWorldSpaceAR(coin.node.position);
            let pos1=this.node.convertToNodeSpaceAR(wpos1);

            coin.node.parent=this.node;
            coin.node.position=pos1;
            
            arr.push(coin);
            
            let wpos2=target.coinParent.parent.convertToWorldSpaceAR(target.coinParent.position);
            let pos2=this.node.convertToNodeSpaceAR(wpos2);

            cc.Tween.stopAllByTarget(coin.node);

            cc.tween(coin.node)
            .delay((can_move-i)* 0.02)
            .call(()=>{
                SoundManager.playSound(Sound.placeCoin);
            })
            .to(0.2,{x:pos2.x,y:pos2.y+y},{easing:"quadOut"})
            // .call(()=>{
            //     target.AddCoin(coin);
            // })
            .start();
        }

        cc.tween(this.node)
        .delay(0.2+can_move*0.02)
        .call(()=>{
            for(let i=0;i<can_move;i++)
            {
                target.AddCoin(arr[i]);
            }

            if(source.getState()==EnumCellState.temp_open)
            {
                source.closeTempPost();
            }

            this.checkBtns();
        })
        .start();

       

    }

    //设置禁止操作
    public banOper()
    {
       this.oper_flag=false;

       this.checkBtns();

       cc.tween(this.node)
       .delay(0.8)
       .call(()=>{
           
            this.oper_flag=true;

            this.checkBtns();
       })
       .start();
    }

    public checkBtns()
    {
        if(this.oper_flag==false)
        {
            this.btn_fp.opacity=150;
            this.btn_hc.opacity=150;
            this.btn_xp.opacity=150;
            this.btn_fp.getComponent(cc.Button).interactable=false;
            this.btn_hc.getComponent(cc.Button).interactable=false;
            this.btn_xp.getComponent(cc.Button).interactable=false;
        }
        else
        {
            this.btn_fp.opacity=255;
            this.btn_fp.getComponent(cc.Button).interactable=true;
            
            if(this.checkMerge()==true)
            {
                this.btn_hc.opacity=255;
                this.btn_hc.getComponent(cc.Button).interactable=true;
            }
            else
            {
                this.btn_hc.opacity=150;
                this.btn_hc.getComponent(cc.Button).interactable=false;
            }

            if(this.checkXiPai()==true)
            {
                this.btn_xp.opacity=255;
                this.btn_xp.active=true;
                this.btn_xp.getComponent(cc.Button).interactable=true;
            }
            else
            {
                this.btn_xp.active=false;
            }

            this.checkMaxNum();

            this.cleckCloseCells();

            this.saveCells();
        }
    }

    public curr_max_num=0;

    public checkMaxNum()
    {
        let max=0;

        for(let i=0;i<this.cells.length;i++)
        {
            for(let k=0;k<this.cells[i].coin_items.length;k++)
            {
                let coin=this.cells[i].coin_items[k];

                let num=coin.getNum();

                if(num>max)
                {
                    max=num;
                }               
            }
        }

        if(max !=this.curr_max_num)
        {



            this.curr_max_num=max;
            if(ProgressView.inst.isOver(max)==true)
            {
               Log.error("完成了关卡")

               this.handleOver();
            }
            else
            {
                let target=ProgressView.inst.getTargetNum();
                ProgressView.inst.setMaxNum(max);
                TargetView.inst.paly(ProgressView.inst.getTargetNum());
            }
        }

       

    }

    public cleckCloseCells()
    {
         let index=ProgressView.inst.getTargetIndex();

         for(var i=0;i<this.close_cells.length;i++)
         {
            if(i<index)
            {
                this.close_cells[i].setCanOpen();
            }
            else  if(i==index)
            {
                this.close_cells[i].setNextUnlock();
            }
         }


    }
   

    public saveCells()
    {
        let arr=[];

        for(let i=0;i<this.cells.length;i++)
        {
            arr.push(this.cells[i].getInfo());
        }

        LData.celldatas=JSON.stringify(arr);
    }

    public restoreCells():boolean
    {
         let str=LData.celldatas;

         if(str=="")
         {
            return false;
         }

         let arr:Array<CellInfo>=JSON.parse(str);

         for(let i=0;i<arr.length;i++)
         {
             this.cells[i].setInfo(arr[i]);
         }
    }


    public handleOver()
    {

        SoundManager.playSound(Sound.win);

        MdGame.inst.over_mask.active=true;

        cc.tween(this.node)
        .delay(1)
        .call(()=>{
            MdTip.inst.showTip("闯关成功,开始下一关")
        })
        .delay(0.5)
        .call(()=>{
            LData.lv++;
            LData.celldatas="";
            this.reset();
            MdGame.inst.startGame();
        })
        .delay(0.5)
        .call(()=>{
           
            MdGame.inst.onFaPai();
            MdGame.inst.over_mask.active=false;
        })
        .start();
    }

    public gm_test()
    {
        if(this.cells[0].coin_items.length<10)
        {
            let card=cc.instantiate(PrefabManager.getPrefab("Coin"));

            let coin =card.getComponent(CoinN);

            coin.setNum(ProgressView.inst.getMaxTargetNum());

            this.cells[0].AddCoin(coin);
        }
    }
   

}