
import Log from "./util/Log";
import pfutil from "./util/pfutil";
import LData from './../manager/LData';

export default class Plat
{

    public static screenWidth=750;
    public static screenHeight=1334;

    public static userinfo:any=null;


    public static plat_name="cocos";

    public static pt:any={};


    //记录一些微信数据
    public static code:string="";
    public static sessionKey:string="";

    public static isWX():boolean
    {
        return this.plat_name=="wx";
    }

    public static isAndroid()
    {
        return this.plat_name=="android";
    }


    public static isCocos()
    {
        return this.plat_name=="cocos";
    }

    public static getGameName()
    {
        return this.plat_name+"_zuzi2";  //好玩的方块
    }
    

    public static init()
    {

        Log.warn("平台初始化123");

        Log.warn("cc.sys.platform---"+cc.sys.platform);

        let info:any={};
        info.nickName="临时玩家"+pfutil.random(1,1000);
        info.avatarUrl="res/1.png";

        this.userinfo=info;


         if(cc.sys.platform ==cc.sys.WECHAT_GAME)
         {

            Log.warn("微信平台初始化");


            this.plat_name="wx";
            this.pt=wx;

            wx.showShareMenu({
                menus:['shareAppMessage',"shareTimeline"],
              //  withShareTicket:true
            })

            wx.onShareAppMessage(function () {
                return {
                    title: '点我,让你告别所有压力',
                    imageUrl: "https://mmocgame.qpic.cn/wechatgame/icqWG6Ur454rQoCthXmhxiaAqeTSiamGfhd04ibCKtyickyDeIKM4xBdakbQjIYLZFia5o/0"
                }
              })


              if(wx.onShareTimeline!=null)
              {
                  wx.onShareTimeline(function () {
                    return {
                        title: '点我,让你告别所有压力',
                        imageUrl: "https://mmocgame.qpic.cn/wechatgame/icqWG6Ur454rQoCthXmhxiaAqeTSiamGfhd04ibCKtyickyDeIKM4xBdakbQjIYLZFia5o/0",
                        imagePreviewUrl:"https://mmocgame.qpic.cn/wechatgame/icqWG6Ur454rQoCthXmhxiaAqeTSiamGfhd04ibCKtyickyDeIKM4xBdakbQjIYLZFia5o/0"
                    }
                  })
              }

            
         }
         else if(cc.sys.platform ==cc.sys.ANDROID)
         {

            Log.warn("微信平台初始化--android");

            this.plat_name="android";
            this.pt={};
         }


          //注册显示回调
          if(this.pt.onShow!=null)
          {
              this.pt.onShow(this.onshow);
          }


         //屏幕尺寸设置
         if(this.pt.getSystemInfoSync)
         {
           
             let system=this.pt.getSystemInfoSync();

             this.screenWidth=system.screenWidth;
             this.screenHeight=system.screenHeight;
 
             console.warn("屏幕宽:"+system.screenWidth);
             console.warn("屏幕高:"+system.screenHeight);
         }
         else
         {
            this.screenWidth= cc.winSize.width
            this.screenHeight= cc.winSize.height

            console.warn("屏幕宽:"+this.screenWidth);
            console.warn("屏幕高:"+this.screenHeight);
         }
    }



    private static  fun_obj:any;
    private static  share_obj:any;

    public static setShareCallback(obj:any,fun:any)
    {
        Plat.share_obj=obj;
        Plat.fun_obj=fun;
    }


    public static state=0;
    //显示回调
    public static onshow(res)
    {
        Log.warn("onshow-----")

        Log.error(res)
       

        if(Plat.fun_obj !=null)
        {
            Plat.fun_obj.call(Plat.share_obj);

            Plat.fun_obj=null;
            Plat.share_obj=null;
        }

        if(this.state==0)
        {
         //   AdInterstitial.show();
        }

        this.state=0;
    }

    //显示回调
    public static getLaunchOptionsSync(res)
    {
        Log.warn("getLaunchOptionsSync-----")

        Log.error(res)
       
    }

    public static showToast(str,jg=2000)
    {
        if(this.pt.showToast !=null)
        {
            this.pt.showToast({
                title: str,
                content:str,
                message:str,
                icon: 'none',
                duration: jg
              })
        }      
    }

    public static hideToast()
    {
        if(this.pt.hideToast !=null)
        {
            this.pt.hideToast({
               
              })
        }      
    }

    public static shareAppMessage()
    {

        Plat.state=1;

        if(this.pt.shareAppMessage==null)
        {
            if(Plat.fun_obj !=null)
            {
                Plat.fun_obj.call(Plat.share_obj);
    
                Plat.fun_obj=null;
                Plat.share_obj=null;
            }

            return;
        };

        this.pt.shareAppMessage({
            title: '点我,让你告别所有压力',
            imageUrl: "https://mmocgame.qpic.cn/wechatgame/icqWG6Ur454rQoCthXmhxiaAqeTSiamGfhd04ibCKtyickyDeIKM4xBdakbQjIYLZFia5o/0"
        })
    }

    public static isBigSize()
    {
        if(Plat.screenHeight > Plat.screenWidth * 2)
        {
           return true;
        }  
        
        return false;
    }

    //类型 0是 短震动 1 是长震动
    public static vibrate(type)
    {
       if(LData.zd==false)
       {
          return;
       }

       if(type==0)
       {
           if(Plat.pt.vibrateShort!=null)
           {
               Plat.pt.vibrateShort({type:"medium"})
           }
       }
       else
       {
            if(Plat.pt.vibrateLong!=null)
            {
               Plat.pt.vibrateLong({})
            }
       }
    }
}