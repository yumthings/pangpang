import Plat from "../xf/Palt";
import Log from "../xf/util/Log";
import AdIds from './AdIds';


export default class AdInterstitial
{
    public static ad:any=null;   //插屏实例


    public static init()
    {
        if(this.ad == null)
        {
            // 创建插屏广告实例，提前初始化
            if (Plat.pt.createInterstitialAd!=null)
            {
                this.ad = Plat.pt.createInterstitialAd({
                adUnitId: AdIds.cp_id
               
                })
            }
        }
    }


    public static show()
    {
        this.init();

        Log.warn("显示插屏广告");

        if(this.ad !=null)
        {
            this.ad.show().catch((err) => {
                console.info('插屏显示失败');
                console.info(err);

              })
        }
    }

   
}