import Plat from "../xf/Palt";
import Log from "../xf/util/Log";
import AdIds from "./AdIds";




export default class AdBanner
{
    private static showflag:boolean=false;  //广告是否显示标志


    private static ad:any;


    private static loadflag:boolean=false;  

    private static initflag=false;


    private static init()
    {
        this.createAd();
    }


    //横幅广告
    public static show()
    {

        if(Plat.isBigSize()==false)
        {
            return;
        }

        Log.warn("展示banner");

        if(this.initflag==false)
        {
            this.initflag=true;

            this.init();
        }

        if(this.showflag==true)
        {
            return ;
        }

        this.showflag=true;

        if(this.loadflag==true)
        {
            this.ad.show();
        }
      
    }

    //隐藏横幅广告
    public static hide()
    {
        if(this.showflag==false)
        {
            return;
        }

        this.showflag=false;

        if(this.loadflag==false)
        {
            return ;
        }

        if(this.ad!=null)
        {
           this.ad.hide();
        }
    }

    private static top:number=0;

    public static createAd()
    {

        Log.warn("创建广告");

        if(Plat.pt.createBannerAd !=null )
        {

           this.ad = Plat.pt.createBannerAd({
                adUnitId: AdIds.banner_id,
              
                style: {
                    left: 0,
                    top:  this.top,
                    width:this.getWidth(),                    
                },
                adIntervals:60,
            })


            this.ad.onError(this.onError.bind(this));

            this.ad.onLoad(this.onLoad.bind(this));     
            
            this.ad.onResize(this.resetSize.bind(this));

       //     Laya.timer.once(BackConfig.adtime * 1000,this,this.updateAd);           
        }
    }



    private static onLoad()
    {

        Log.warn("广告加载成功");


        this.loadflag=true;

        this.ad.hide();

        if(this.showflag==true)
        {
            this.ad.show();
        }
    }


    private static onError(res:any)
    {      
        Log.warn("广告加载失败");
        Log.warn(res);

    }

    public static resetSize(res)
	{    
        Log.warn("广告重置尺寸");


        if(this.ad!=null && this.ad.style!=null)
        {           
          
            let h=(cc.winSize.height/2+ 620)/cc.winSize.height*Plat.screenHeight;

           
            this.ad.style.top=h;      
            this.ad.style.left=(Plat.screenWidth-res.width)/2;

        }       
    }
	
	public static getWidth()
    {
         let w=Plat.screenWidth;
      
    //    if(Plat.isBigSize()==false)
        {
           //if(Date.now()<1682315826000)
           {
               w=300;
           }
        }             

        return w;
        
    }

}