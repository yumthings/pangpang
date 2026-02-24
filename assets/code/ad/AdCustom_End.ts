
import Plat from "../xf/Palt";
import Log from "../xf/util/Log";
import AdIds from './AdIds';





export default class AdCustom_End
{
 

    private static ad:any;


    private static initflag=false;



    public static init()
    {
        this.initflag=true;
        this.createAd();
    }

    //横幅广告
    public static show()
    {
        if(this.initflag==false)
        {
            this.init();
        }
       
        if(this.ad!=null)
        {
            this.ad.show();
        }
       
        
    }

    public static hide()
    {
      //  console.warn("隐藏--over")

        if(this.ad !=null)
        {
            if(this.ad.isShow()==true)
            {
                this.ad.hide();
            }
            else
            {
                setTimeout(()=>{
                    this.hide();
                },100)
            }
        }
    }



    public static createAd()
    {
        let top=(Plat.screenHeight-430)/2;

        if(Plat.pt.createCustomAd !=null )
        {

           this.ad = Plat.pt.createCustomAd({
                adUnitId: AdIds.getOverCustomId(),
                adIntervals: 60,
                style: {
                    left: 0,
                    top:  top,
                    width:Plat.screenWidth                  
                }
            })

            this.ad.onError((res)=>{
                
                console.error("错误--"+res.errCode);

                this.ad=null;      
            })
        }
    }

  

}