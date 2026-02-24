import LocalManager from "../../manager/LocalManager";
import Main from './../../Main';


export default class EventUp
{
   public static level_start(lv:number)
   {

    // console.warn("事件上传--关卡开始");

      // let wx:any=window.wx;

      // let curr=Math.floor(Date.now()/1000);

      // let time=curr - Main.inst.start_time;

      // if(wx!=null)
      // {
      //    if(wx.reportEvent!=null)
      //    {
      //    //   console.warn("事件上传--关卡开始2");
           
      //           wx.reportEvent("level_start", {
      //                   "lv": lv,
      //                   "ab":LocalManager.ab,
      //                   "first":LocalManager.isFirst,
      //                   "time":time
      //               })
      //    }
      // }
      
   }

   public static level_end(lv:number)
   {

       // console.warn("事件上传--关卡结束");

      //  let curr=Math.floor(Date.now()/1000);

      //  let time=curr - Main.inst.start_time;

      //   let wx:any=window.wx;

      //   if(wx!=null)
      //   {
      //       if(wx.reportEvent!=null)
      //       {
      //          // console.warn("事件上传--关卡结束2");
                
      //               wx.reportEvent("level_end", {
      //                       "lv": lv,
      //                       "ab":LocalManager.ab,
      //                       "first":LocalManager.isFirst,
      //                       "time":time
      //                   })
      //       }
      //   }
      
   }
}

