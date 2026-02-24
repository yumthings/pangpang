
import EnumCellState from './../struct/EnumCellState';
import pfutil from './../xf/util/pfutil';
import CoinN from './CoinN';
import PrefabManager from './../xf/manager/PrefabManager';
import Log from '../xf/util/Log';
import CellPanel from './CellPanel';
import AdVideo from './../ad/AdVideo';
import CellInfo from './../struct/CellInfo';
import SoundManager from './../manager/SoundManager';
import Sound from './../struct/Sound';
import Plat from './../xf/Palt';
const {ccclass, property} = cc._decorator;


@ccclass
export default class Cell extends cc.Component 
{

    @property(cc.Node)
    coinParent: cc.Node = null;

    @property(cc.Node)
    lock: cc.Node = null;

    @property(cc.Node)
    mergeBg: cc.Node = null;

    @property(cc.Node)
    adsLockBg: cc.Node = null;

    @property(cc.Node)
    lockBg: cc.Node = null;

    @property(cc.Node)
    unlockingBg: cc.Node = null;

    @property(cc.Animation)
    lockAnim: cc.Animation = null;


    @property(cc.Node)
    lock_icon: cc.Node = null;

  

    @property(cc.Node)
    open: cc.Node = null;

    @property(cc.Sprite)
    ad_icon: cc.Sprite = null;

    @property(cc.SpriteFrame)
    fx: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    sp: cc.SpriteFrame = null;

    public state:number=-1;

    public coin_items:Array<CoinN>=new Array();

    private up_flag:boolean=false;//弹起标志

    private share:boolean=true;

    

    protected start(): void {

        this.node.on(cc.Node.EventType.TOUCH_START,this.onClick,this);

        if(this.share==true)
        {
            this.ad_icon.spriteFrame=this.fx;
        }
        else
        {
            this.ad_icon.spriteFrame=this.sp;
        }
        
    }

    public post:number=0;

    public init(index:number)
    {
         this.post=index;

         this.mergeBg.active=false;
         this.unlockingBg.active=false;
         this.adsLockBg.active=false;
         this.lock.active=false;
    }

    public onClick()
    {
        Log.error("单元被点击--"+this.post);


        switch(this.state)
        {
            case EnumCellState.lock:
                {
                    break;
                };
            case EnumCellState.lock_next:
                {
                    break;
                };       
            case EnumCellState.temp_ad:   //临时广告
                {

                    if(this.share==false)
                    {
                        AdVideo.show({
                            onVideoAdClose:(isend:boolean)=>{
    
                                if(isend==false)
                                {
                                    return ;
                                }
    
                                CellPanel.inst.tempCellClick(this);
    
                            },
                            onVideoAdError:()=>{
    
                                CellPanel.inst.tempCellClick(this);
    
                            }
                        })
                    }
                    else
                    {
                        Plat.setShareCallback(this,this.shareback);
                        Plat.shareAppMessage();
                    }

                  


                    break;
                };
            case EnumCellState.unlock: //可解锁
                {
                    this.openPost();

                    break;
                };
            case EnumCellState.normal:
            case EnumCellState.temp_open:
                {
                    CellPanel.inst.cellClick(this);
                    break;
                };
        }
    }

    public upCoins()
    {

        if(this.up_flag==true)
        {
            return;
        }

        SoundManager.playSound(Sound.chooseCoin);

        this.up_flag=true;

        let num=0;


        for(let i=this.coin_items.length-1;i>=0;i--)
        {
            let coin=this.coin_items[i];

            if(num==0)
            {
                num=coin.getNum();
            }

            if(coin.getKnow()==false)
            {
                break;
            }
            if(coin.getNum() !=num)
            {
                break;
            }

            cc.tween(coin.node)
             .to(0.2,{y:Cell.getPosY(i)+30})
             .call(()=>{
                cc.tween(coin.node)
                .to(0.5,{y:Cell.getPosY(i)+20})
                .to(0.5,{y:Cell.getPosY(i)+30})
                .union()
                .repeatForever()
                .start();
             })
             .start();
        }
    
    }

    //type==1 正常放下 type==2 抖动放下
    public downCoins(type)
    {

        if(this.up_flag==false)
        {
            return;
        }

        this.up_flag=false;

        if(type==1)
        {
            SoundManager.playSound(Sound.chooseCoin);

            for(let i=this.coin_items.length-1;i>=0;i--)
            {
                let coin=this.coin_items[i];

                cc.Tween.stopAllByTarget(coin.node);
    
                cc.tween(coin.node)
                 .to(0.1,{y:Cell.getPosY(i)})
                 .start();
            }
        }
        else
        {

            SoundManager.playSound(Sound.warn);

            let num=0;

            for(let i=this.coin_items.length-1;i>=0;i--)
            {
                let coin=this.coin_items[i];
    
                if(num==0)
                {
                    num=coin.getNum();
                }
    
                if(coin.getKnow()==false)
                {
                    break;
                }
                if(coin.getNum() !=num)
                {
                    break;
                }

                cc.Tween.stopAllByTarget(coin.node);
    
                cc.tween(coin.node)
                 .to(0.08,{x:20})
                 .to(0.08,{x:-20})
                 .to(0.08,{x:0})
                 .to(0.1,{y:Cell.getPosY(i)})
                 .start();
            }
        }
    
        
      
    }




    public setState(state)
    {
        if(this.state==state)
        {
           return;
        }

        this.state=state;

        if(state==EnumCellState.normal)  //正常开启状态
        {
            this.mergeBg.active=false;
            this.unlockingBg.active=false;
            this.adsLockBg.active=false;
            this.lock.active=false;
        }
        else if(state==EnumCellState.unlock)  //可解锁状态
        {
            this.mergeBg.active=false;
            this.unlockingBg.active=true;
            this.adsLockBg.active=false;
            this.lock.active=false;

            let ani=this.unlockingBg.getComponent(cc.Animation);
            ani.play("unlock1");

            let node = this.unlockingBg.getChildByName("Lock2");
            node.y=0;

        }
        else if(state==EnumCellState.lock)  //锁定状态
        {
            this.mergeBg.active=false;
            this.unlockingBg.active=false;
            this.adsLockBg.active=false;
            this.lock.active=true;
            this.lock_icon.opacity=150;
        }
        else if(state==EnumCellState.lock_next)  //锁定状态--下次解锁
        {
            this.mergeBg.active=false;
            this.unlockingBg.active=false;
            this.adsLockBg.active=false;
            this.lock.active=true;
            this.lock_icon.opacity=255;

           
        }
        else if(state==EnumCellState.temp_ad)  //临时状态--可解锁
        {
            this.mergeBg.active=false;
            this.unlockingBg.active=false;
            this.adsLockBg.active=true;
            this.lock.active=false;

            let node = this.adsLockBg.getChildByName("adsLockBg");
            node.y=0;
        }
        if(state==EnumCellState.temp_open)  //临时开启状态
        {
            this.mergeBg.active=false;
            this.unlockingBg.active=false;
            this.adsLockBg.active=false;
            this.lock.active=false;
        }

        

    }

    public getState()
    {
       return this.state;
    }

    public getHaveCoin()
    {
        if(this.state==EnumCellState.normal)
        {
            let arr:Array<number>=new Array();

            for(let i=0;i<this.coin_items.length;i++)
            {
                if(arr.indexOf(this.coin_items[i].getNum())==-1)
                {
                   arr.push(this.coin_items[i].getNum());
                }
            }

            return arr;
        }
        else
        {
            return null;
        }
    }

    public getHaveCoinCount()
    {
        return this.coin_items.length;
    }

    public getAllCoins()
    {
        return this.coin_items;
    }

    public getCanAddCount()
    {
        if(this.state!=EnumCellState.normal && this.state !=EnumCellState.temp_open)
        {
            return 0;
        }

        return  10 - this.coin_items.length;
    }

    public updateView()
    {
        let arr:Array<number>=new Array();

        for(let i=0;i<this.coin_items.length;i++)
        {
           this.coin_items[i].node.y=72-i*18;
           this.coin_items[i].node.x=0;
        }
    }

    public AddCoin(coin:CoinN)
    {
        this.coin_items.push(coin);
        coin.node.parent=this.coinParent;
        this.updateView();
    }

    public static getPosY(index):number
    {
        return 72-index*18;
    }

    public getLastCoinNum()
    {
        if(this.coin_items.length==0)
        {
            return 0;
        }

        return this.coin_items[this.coin_items.length-1].getNum();
    }

    public getLastCoinCount()
    {
        let num=0;
        let count=0;

        for(var i=this.coin_items.length-1;i>=0;i--)
        {
            let coin=this.coin_items[i];

            if(num==0)
            {
                num=coin.getNum();
            }

            if(coin.getKnow()==false)
            {
                break;
            }
            if(coin.getNum() !=num)
            {
                break;
            }

            count++;

        }

        return count;
    }

    public merge()
    {
        if(this.canMerge()==false)
        {
            return;
        }

        for(let i=0;i<this.coin_items.length;i++)
        {
           let coin=this.coin_items[i];
           cc.tween(coin.node)
           .to(0.05*i,{y:72-18})
           .start();
        }

        cc.tween(this.node)
        .delay(0.05*this.coin_items.length)
        .call(()=>{
            this.delCoints();
        })
        .start();

    }
    public delCoints()
    {
        for(let i=0;i<this.coin_items.length;i++)
        {
           let coin=this.coin_items[i];
           cc.tween(coin.node)
           .to(0.1,{scale:0})
           .start();
        }

        cc.tween(this.node)
        .delay(0.1)
        .call(()=>{
            this.replaceCoins();
        })
        .start();
    }

    public replaceCoins()
    {
       
        let num=this.coin_items[0].getNum();

    

        for(let i=0;i<this.coin_items.length;i++)
        {
           let coin=this.coin_items[i];
           coin.node.parent=null;
          
        }

        this.coin_items=[];



        let card=cc.instantiate(PrefabManager.getPrefab("Coin"));

        let coin =card.getComponent(CoinN);

        coin.setNum(num+1);

        card.parent=this.coinParent;

        this.coin_items.push(coin);

        card=cc.instantiate(PrefabManager.getPrefab("Coin"));

        coin =card.getComponent(CoinN);

        coin.setNum(num+1);

        card.parent=this.coinParent;

        this.coin_items.push(coin);

        this.updateView();

        for(let i=0;i<this.coin_items.length;i++)
        {
           let coin=this.coin_items[i];
           coin.node.scale=0;

           cc.tween(coin.node)
           .to(0.1,{scale:1})
           .start();
        }
    }

    public canMerge():boolean
    {
        if(this.coin_items.length!=10)
        {
            return false;
        }

        let num=this.coin_items[0].getNum();

        for(let i=0;i<this.coin_items.length;i++)
        {
          if(this.coin_items[i].getKnow()==false)
          {
            return false;
          }
          if(this.coin_items[i].getNum()!=num)
          {
            return false;
          }
        }

        return true;
       
    }
    public checkMerge()
    {
        if(this.canMerge()==true)
        {
            this.mergeBg.active=true;
        }
        else
        {
            this.mergeBg.active=false;
        }
        return this.canMerge();
    }

   

    public setCanOpen()
    {
        if(this.state!=EnumCellState.normal)
        {
            this.setState(EnumCellState.unlock);
        }
    }

    public setNextUnlock()
    {
        if(this.state!=EnumCellState.normal && this.state!=EnumCellState.lock_next)
        {
            SoundManager.playSound(Sound.unlockArea);
            this.setState(EnumCellState.lock_next);
        }
    }


    public openPost()
    {

        SoundManager.playSound(Sound.getArea);
     
        let ani=this.unlockingBg.getComponent(cc.Animation);

        ani.stop("unlock1");

        let node = this.unlockingBg.getChildByName("Lock2");


        cc.tween(node)
        .to(0.4,{y:220})
        .call(()=>{

            this.unlockingBg.active=false;
            this.setState(EnumCellState.normal);

        })
        .start();

        this.open.active=true;

        cc.tween(this.open)
        .set({scale:1,opacity:0})
        .to(0.3,{scale:1.1,opacity:255})
        .to(0.3,{scale:1.2,opacity:0})
        .union()
        .repeat(2)       
        .start();


        cc.tween(this.node)
        .delay(1.2)
        .call(()=>{
            this.open.active=false;
        })
        .start();

        


    }

    public openTempPost()
    {
     
         SoundManager.playSound(Sound.getArea);

        let node = this.adsLockBg.getChildByName("adsLockBg");
        node.y=0;

        cc.tween(node)
        .to(0.4,{y:220})
        .call(()=>{

            this.adsLockBg.active=false;
            this.setState(EnumCellState.temp_open);

        })
        .start();


        this.open.active=true;

        cc.tween(this.open)
        .set({scale:1,opacity:0})
        .to(0.3,{scale:1.1,opacity:255})
        .to(0.3,{scale:1.2,opacity:0})
        .union()
        .repeat(2)       
        .start();


        cc.tween(this.node)
        .delay(1.2)
        .call(()=>{
            this.open.active=false;
        })
        .start();


    }

    public closeTempPost()
    {
        this.share=false;

        this.ad_icon.spriteFrame=this.sp;  
        
        this.adsLockBg.active=true;
        let node = this.adsLockBg.getChildByName("adsLockBg");
        node.y=220;

        cc.tween(node)
        .to(0.4,{y:0})
        .call(()=>{

            this.setState(EnumCellState.temp_ad);

        })
        .start();
    }

    private info:CellInfo=new CellInfo();

    public getInfo()
    {
        this.info.state=this.state;
        this.info.nums.length=0;

        for(let i=0;i<this.coin_items.length;i++)
        {
            this.info.nums.push(this.coin_items[i].getNum());
        }

        return this.info;
    }

    public setInfo(info:CellInfo)
    {

        if(info.state==EnumCellState.temp_no_ad)
        {
            info.state=EnumCellState.temp_ad;
        }

        this.setState(info.state);

        

        for(let i=0;i<info.nums.length;i++)
        {
            let card=cc.instantiate(PrefabManager.getPrefab("Coin"));

            card.parent=this.coinParent;

            let coin =card.getComponent(CoinN);
    
            coin.setNum(info.nums[i]);

            this.coin_items.push(coin);
        }

        this.updateView();
    }


    //分享回调
    public shareback()
    {
        CellPanel.inst.tempCellClick(this);
    }

}

