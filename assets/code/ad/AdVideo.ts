import Plat from "../xf/Palt";
import AdIds from "./AdIds";

export default class AdVideo
{

    public static ad:any=null;  //视频广告实例

    public static callback:IVideoAd;

    public static init()
    {
        if(Plat.pt.createRewardedVideoAd !=null)  
        {  

            if(this.ad==null && Plat.pt.createRewardedVideoAd!=null)
            {
                this.ad=Plat.pt.createRewardedVideoAd({                       
                    
                        adUnitId:AdIds.video_id
                      
                    });

                if(this.ad !=null)
                {
                    this.ad.onClose(this.onVideoAdClose.bind(this));
                    this.ad.onError(res=>{console.log("视频加载错误22");console.log(res)});

                    this.ad.onLoad(res=>{
                        console.log("视频加载成功");
                    })

                }
            }
        }

    }

    public static show(call:IVideoAd)
    {

        this.callback=call;


            if(this.ad !=null)
            {
                // 用户触发广告后，显示激励视频广告
                this.ad.show().catch(() => {
                    // 失败重试
                    this.ad.load()
                    .then(() => this.ad.show())
                    .catch(err => {
                        console.warn(err);

                        this.onVideoAdError(err);
                    })
                })
            }
            else
            {
                this.callback.onVideoAdClose(true);
            }
       
    }

    public static onVideoAdError(res)
    {
       
        if(this.callback!=null)
        {
           this.callback.onVideoAdError();
        }

    }

    public static onVideoAdClose(res)
    {
        if(this.callback!=null)
        {
           this.callback.onVideoAdClose(res && res.isEnded || res === undefined);
        }


    }
    
    
   
}