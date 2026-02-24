
import Plat from "../xf/Palt";
import Log from "../xf/util/Log";
import AdIds from "./AdIds";




export default class AdCustom_Up
{
    private static showflag:boolean=false;  //广告是否显示标志


    private static ad:any;


    private static loadflag:boolean=false;

    private static initflag=false;


    public static init()
    {
        this.initflag=true;


        this.createAd();
    }

    //横幅广告
    public static show()
    {


        if(Plat.isBigSize()==false)
        {
           return;
        }

        if(this.initflag==false)
        {
            this.init();
        }
       
        Log.warn("展示原生广告up");

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
            return;
        }

        if(this.ad!=null)
        {
           this.ad.hide();
        }
    }

    public static createAd()
    {

        Log.warn("创建原生广告up");

        let top=0;

        let left = (Plat.screenWidth -360 * 0.8) /2;



        if(Plat.pt.createCustomAd !=null )
        {

           this.ad = Plat.pt.createCustomAd({
                adUnitId: AdIds.up_zdy_id,
                adIntervals: 150,
                style: {
                    left: left,
                    top:  top,
                    
                }
            })


            this.ad.onError(this.onError.bind(this));

            this.ad.onLoad(this.onLoad.bind(this));     
            
           
        }
    }

    private static onLoad()
    {

        Log.warn("原生广告up加载成功");


        this.loadflag=true;

        if(this.showflag==true)
        {
            this.ad.show();
        }
        else
        {
            this.ad.hide();
        }
    }

    private static onError(res:any)
    {      
        Log.warn("原生广告up加载失败");
        Log.warn(res);
    }

}