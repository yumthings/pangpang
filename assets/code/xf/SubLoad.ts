
import Plat from "./Palt";
import Log from "./util/Log";

export default class SubLoad
{

   //分包加载逻辑

   public static packages=[];


   public static index=0;

    public static init()
    {

        this.packages.push("res");
        this.packages.push("resources");

       
    }

    private static callback:any;
    

    //加载分包
    public static loadSub(call)
    {
        this.init();


        this.callback=call;

         Log.warn("开始加载微信分包")


         if(Plat.isWX()==false)
         {
           
            this.loadComplete();
            return ;
         }

         Log.warn("正在加载---"+this.packages[this.index])
               
         Plat.pt.loadSubpackage({
            name:this.packages[this.index],
            success:this.ok.bind(this),
            fail:this.err.bind(this)
         })

    }

    public static ok()
    {
        this.index++;


        if(this.index==this.packages.length)
        {
            //全部加载完了..
           this.loadComplete();

            return ;
        }

        Log.warn("正在加载---"+this.packages[this.index])

        Plat.pt.loadSubpackage({
            name:this.packages[this.index],
            success:this.ok.bind(this),
            fail:this.err.bind(this)
         })
    }

    public static err(res)
    {
        console.error("分包加载失败了2")
        console.error(res);
    }



    //加载完成...
    public static loadComplete()
    {
      Log.warn("微信分包加载完毕")
      this.callback();
    }
}