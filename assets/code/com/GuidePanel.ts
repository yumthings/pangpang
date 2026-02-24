import MdGame from "../module/MdGame";
import Log from "../xf/util/Log";
import CellPanel from "./CellPanel";
import ProgressView from "./ProgressView";
import LData from './../manager/LData';

const {ccclass, property} = cc._decorator;


@ccclass
export default class GuidePanel extends cc.Component 
{

    private static _inst:GuidePanel;

    public static get inst()
    {
        return this._inst;
    }




    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    hand: cc.Node = null;

    @property(cc.Node)
    button: cc.Node = null;

    @property(cc.Sprite)
    labelBg: cc.Sprite = null;
   
    @property(cc.Node)
    targetBtn: cc.Node = null;

    @property([cc.SpriteFrame])
    labelSprites: Array<cc.SpriteFrame> =new Array();

    @property([cc.SpriteFrame])
    maskSprites: Array<cc.SpriteFrame> =new Array();

    @property([cc.Vec2])
    handOffPositions: Array<cc.Vec2> = new Array();


    public curr_step=0;
   

    protected onLoad(): void
    {
        GuidePanel._inst=this;      
    }

    protected start(): void
    {
      
        
    }

    public show()
    {
        
    }

    public startGuide()
    {       
        this.step1();
    }

    public onClick()
    {
        Log.error("引导点击--"+this.curr_step);

        if(this.curr_step==1)
        {
            CellPanel.inst.cells[0].onClick();
            this.step2();
        }
        else if(this.curr_step==2)
        {
            CellPanel.inst.cells[2].onClick();
            this.step3();
        }
        else if(this.curr_step==3)
        {
            MdGame.inst.onHeCheng();

            this.node.active=false;

            cc.tween(this.node)
            .delay(1)
            .call(()=>{
                this.node.active=true;
                this.step4();
            })
            .start();
          
        }
        else if(this.curr_step==4)
        {
            MdGame.inst.onFaPai();

            this.node.active=false;

            cc.tween(this.node)
            .delay(1)
            .call(()=>{
                this.node.active=true;
                this.step5();
            })
            .start();
        }
        else if(this.curr_step==5)
        {
            CellPanel.inst.cells[0].onClick();
            this.step6();
        }
        else if(this.curr_step==6)
        {
            CellPanel.inst.cells[1].onClick();
            this.step7();
        }
        else if(this.curr_step==7)
        {
            CellPanel.inst.cells[2].onClick();
            this.step8();
        }
        else if(this.curr_step==8)
        {
            CellPanel.inst.cells[1].onClick();
            this.step9();
        }
        else if(this.curr_step==9)
        {
            MdGame.inst.onHeCheng();
            this.step10();
        }
        else if(this.curr_step==10)
        {
           // this.step11();
        }
        else if(this.curr_step==11)
        {
           LData.guide=0;

           MdGame.inst.onFaPai();
           this.node.parent=null;
           MdGame.inst.guide=null;
           this.node.destroy();
        }
    }

    //引导第一步
    public step1()
    {
         this.curr_step=1;

         let cell = CellPanel.inst.getCell(0);

         let pos = cell.node.parent.convertToWorldSpaceAR(cell.node.position);

         let pos2 = this.content.parent.convertToNodeSpaceAR(pos);

         this.content.x=pos2.x;
         this.content.y=pos2.y;

         this.hand.x=pos2.x +this.handOffPositions[0].x;
         this.hand.y=pos2.y + this.handOffPositions[0].y;


         this.mask.getComponent(cc.Mask).spriteFrame=this.maskSprites[0];

         this.mask.width=this.maskSprites[0].getOriginalSize().width;
         this.mask.height=this.maskSprites[0].getOriginalSize().height;

         this.labelBg.spriteFrame=this.labelSprites[this.curr_step-1]

         this.labelBg.node.x=0;
         this.labelBg.node.y=160;

       //  this.button.position=pos2;

         Log.error("引导第1步");

        //  this.scheduleOnce(()=>{
        //     this.step2();
        //  },2);
    }

     //引导第二步
     public step2()
     {
          this.curr_step=2;

          let cell = CellPanel.inst.getCell(2);
 
          let pos = cell.node.parent.convertToWorldSpaceAR(cell.node.position);
 
          let pos2 = this.content.parent.convertToNodeSpaceAR(pos);
 
          this.content.position=pos2;
 
          this.hand.x=pos2.x +this.handOffPositions[1].x;
          this.hand.y=pos2.y + this.handOffPositions[1].y;

          this.labelBg.spriteFrame=this.labelSprites[this.curr_step-1]
 
          Log.error("引导第2步");
 
        //   this.scheduleOnce(()=>{
        //      this.step3();
        //   },2);
     }

      //引导第三步
      public step3()
      {
          this.curr_step=3;

           let cell = CellPanel.inst.getCell(2);
  
           let pos = cell.node.parent.convertToWorldSpaceAR(cell.node.position);
  
           let pos2 = this.content.parent.convertToNodeSpaceAR(pos);
  
           this.content.position=pos2;
  
           this.hand.x=pos2.x +this.handOffPositions[2].x;
           this.hand.y=pos2.y + this.handOffPositions[2].y;

           this.mask.getComponent(cc.Mask).spriteFrame=this.maskSprites[2];

           let w=this.mask.width;
           let h=this.mask.height;

           this.mask.width=this.maskSprites[2].getOriginalSize().width;
           this.mask.height=this.maskSprites[2].getOriginalSize().height;

           this.content.x+=(this.mask.width-w)/2
           this.content.y-=(this.mask.height-h)/2


           let pos3 = this.mask.parent.convertToWorldSpaceAR(this.mask.position);

           let pos4=this.hand.parent.convertToNodeSpaceAR(pos3);

           this.hand.x=pos4.x+this.mask.width/2 -50;
           this.hand.y=pos4.y -this.mask.height/2+80;

           this.labelBg.spriteFrame=this.labelSprites[this.curr_step-1]

           this.labelBg.node.x-=(this.mask.width-w)/2+50;
           this.labelBg.node.y+=(this.mask.height-h)/2+30;

           this.button.width=296;
           this.button.height=156;

           this.button.x=0
           this.button.y=-this.mask.height/2 +156/2;


  
           Log.error("引导第3步");
  
        //    this.scheduleOnce(()=>{
        //       this.step4();
        //    },2);
      }


      //引导第四步
    public step4()
    {
         this.curr_step=4;

         let fp_node = MdGame.inst.btn_fp;

         let pos = fp_node.parent.convertToWorldSpaceAR(fp_node.position);

         let pos2 = this.content.parent.convertToNodeSpaceAR(pos);

         this.content.position=pos2;

         this.hand.x=pos2.x +this.handOffPositions[this.curr_step-1].x;
         this.hand.y=pos2.y + this.handOffPositions[this.curr_step-1].y;


         this.mask.getComponent(cc.Mask).spriteFrame=this.maskSprites[this.curr_step-1];

         this.mask.width=this.maskSprites[this.curr_step-1].getOriginalSize().width;
         this.mask.height=this.maskSprites[this.curr_step-1].getOriginalSize().height;

         this.labelBg.spriteFrame=this.labelSprites[this.curr_step-1]
         this.labelBg.node.x=0;
         this.labelBg.node.y=160;

         this.button.x=0;
         this.button.y=0;

         Log.error("引导第4步");

        //  this.scheduleOnce(()=>{
        //     this.step5();
        //  },2);
    }


       //引导第5步
       public step5()
       {
            this.curr_step=5;
   
            let cell = CellPanel.inst.getCell(0);

            let pos = cell.node.parent.convertToWorldSpaceAR(cell.node.position);
   
            let pos2 = this.content.parent.convertToNodeSpaceAR(pos);
   
            this.content.position=pos2;
   
            this.hand.x=pos2.x +this.handOffPositions[this.curr_step-1].x;
            this.hand.y=pos2.y + this.handOffPositions[this.curr_step-1].y;
   
   
            this.mask.getComponent(cc.Mask).spriteFrame=this.maskSprites[this.curr_step-1];
   
            this.mask.width=this.maskSprites[this.curr_step-1].getOriginalSize().width;
            this.mask.height=this.maskSprites[this.curr_step-1].getOriginalSize().height;
   

            this.labelBg.spriteFrame=this.labelSprites[this.curr_step-1]
            this.labelBg.node.x=0;
            this.labelBg.node.y=160;

            this.button.width=110;
            this.button.height=220;
   
            Log.error("引导第"+ this.curr_step+"步");
   
            // this.scheduleOnce(()=>{
            //    this.step6();
            // },2);
       }

        //引导第6步
        public step6()
        {
             this.curr_step=6;
    
             let cell = CellPanel.inst.getCell(1);
 
             let pos = cell.node.parent.convertToWorldSpaceAR(cell.node.position);
    
             let pos2 = this.content.parent.convertToNodeSpaceAR(pos);
    
             this.content.position=pos2;
    
             this.hand.x=pos2.x +this.handOffPositions[this.curr_step-1].x;
             this.hand.y=pos2.y + this.handOffPositions[this.curr_step-1].y;
    
    
             this.mask.getComponent(cc.Mask).spriteFrame=this.maskSprites[this.curr_step-1];
    
             this.mask.width=this.maskSprites[this.curr_step-1].getOriginalSize().width;
             this.mask.height=this.maskSprites[this.curr_step-1].getOriginalSize().height;
    

             this.labelBg.node.active=false;
           
    
            //  this.scheduleOnce(()=>{
            //     this.step7();
            //  },2);

             Log.error("引导第"+ this.curr_step+"步");
        }

        //引导第7步
        public step7()
        {
            this.curr_step=7;
    
            let cell = CellPanel.inst.getCell(2);

            let pos = cell.node.parent.convertToWorldSpaceAR(cell.node.position);
    
            let pos2 = this.content.parent.convertToNodeSpaceAR(pos);
    
            this.content.position=pos2;
    
            this.hand.x=pos2.x +this.handOffPositions[this.curr_step-1].x;
            this.hand.y=pos2.y + this.handOffPositions[this.curr_step-1].y;
    
    
            this.mask.getComponent(cc.Mask).spriteFrame=this.maskSprites[this.curr_step-1];
    
            this.mask.width=this.maskSprites[this.curr_step-1].getOriginalSize().width;
            this.mask.height=this.maskSprites[this.curr_step-1].getOriginalSize().height;
    
    
            // this.scheduleOnce(()=>{
            //     this.step8();
            // },2);

            Log.error("引导第"+ this.curr_step+"步");
        }

        //引导第8步
        public step8()
        {
            this.curr_step=8;
    
            let cell = CellPanel.inst.getCell(1);

            let pos = cell.node.parent.convertToWorldSpaceAR(cell.node.position);
    
            let pos2 = this.content.parent.convertToNodeSpaceAR(pos);
    
            this.content.position=pos2;
    
            this.hand.x=pos2.x +this.handOffPositions[this.curr_step-1].x;
            this.hand.y=pos2.y + this.handOffPositions[this.curr_step-1].y;
    
    
            this.mask.getComponent(cc.Mask).spriteFrame=this.maskSprites[this.curr_step-1];
    
            this.mask.width=this.maskSprites[this.curr_step-1].getOriginalSize().width;
            this.mask.height=this.maskSprites[this.curr_step-1].getOriginalSize().height;
    
    
            // this.scheduleOnce(()=>{
            //     this.step9();
            // },2);

            Log.error("引导第"+ this.curr_step+"步");
        }

        //引导第9步
        public step9()
        {
            this.curr_step=9;
    
            let node =MdGame.inst.btn_hc;

            let pos = node.parent.convertToWorldSpaceAR(node.position);
    
            let pos2 = this.content.parent.convertToNodeSpaceAR(pos);
    
            this.content.position=pos2;
    
            this.hand.x=pos2.x +this.handOffPositions[this.curr_step-1].x;
            this.hand.y=pos2.y + this.handOffPositions[this.curr_step-1].y;
    
    
            this.mask.getComponent(cc.Mask).spriteFrame=this.maskSprites[this.curr_step-1];
    
            this.mask.width=this.maskSprites[this.curr_step-1].getOriginalSize().width;
            this.mask.height=this.maskSprites[this.curr_step-1].getOriginalSize().height;
    
    
            this.button.width=296;
            this.button.height=156;

            // this.scheduleOnce(()=>{
            //     this.step10();
            // },2);

            Log.error("引导第"+ this.curr_step+"步");
        }


         //引导第10步
         public step10()
         {
             this.curr_step=10;
     
             let node = ProgressView.inst.getTargetNode(4);
 
             let pos = node.parent.convertToWorldSpaceAR(node.position);
     
             let pos2 = this.content.parent.convertToNodeSpaceAR(pos);
     
             this.content.position=pos2;
     
             this.hand.x=pos2.x +this.handOffPositions[this.curr_step-1].x;
             this.hand.y=pos2.y + this.handOffPositions[this.curr_step-1].y;
     
     
             this.mask.getComponent(cc.Mask).spriteFrame=this.maskSprites[this.curr_step-1];
     
             this.mask.width=this.maskSprites[this.curr_step-1].getOriginalSize().width;
             this.mask.height=this.maskSprites[this.curr_step-1].getOriginalSize().height;
     
             this.labelBg.node.active=true;
             this.labelBg.spriteFrame=this.labelSprites[this.curr_step-1]
             this.labelBg.node.x=-150;
             this.labelBg.node.y=-160;

             this.hand.active=false;
           
     
             this.scheduleOnce(()=>{
                 this.step11();
             },2);

             Log.error("引导第"+ this.curr_step+"步");
         }


         //引导第11步
         public step11()
         {
             this.curr_step=11;
     
             let fp_node = MdGame.inst.btn_fp;

             let pos = fp_node.parent.convertToWorldSpaceAR(fp_node.position);
     
             let pos2 = this.content.parent.convertToNodeSpaceAR(pos);
     
             this.content.position=pos2;
     
             this.hand.x=pos2.x +this.handOffPositions[this.curr_step-1].x;
             this.hand.y=pos2.y + this.handOffPositions[this.curr_step-1].y;
     
     
             this.mask.getComponent(cc.Mask).spriteFrame=this.maskSprites[this.curr_step-1];
     
             this.mask.width=this.maskSprites[this.curr_step-1].getOriginalSize().width;
             this.mask.height=this.maskSprites[this.curr_step-1].getOriginalSize().height;
     

             this.hand.active=true;

             this.labelBg.node.active=false;

            //  this.scheduleOnce(()=>{

            //      this.node.parent=null;

            //  },2);

             Log.error("引导第"+ this.curr_step+"步");
         }

   
}
