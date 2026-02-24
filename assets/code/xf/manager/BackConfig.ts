
import Plat from "../Palt";
import Http from "../util/Http";

export default class BackConfig
{

    //qq运营后台配置
   
    public static open:number=1;



    public static init()
    {
        this.getBackInfo();
    }



    public static getBackInfo()
    {
        let name="wx_zuzi2";

      
        let url="https://sgame.pkfj.xyz/rank/getGameConfig?gamename="+name;

      
        Http.post(url).then((res:any)=>{

            let data=JSON.parse(res);

            if(data==null)
            {
                return;
            }
    
            if(data.datas==null)
            {
                return;
            }
            if(data.datas.config==null)
            {
                return;
            }


    
            let config=JSON.parse(data.datas.config);

    
            if(config==null)
            {
                return;
            }
    
            if(config.open!=null)
            {
                this.open=config.open;
            }

        });


    }

    public static canGame():boolean
    {
        return this.open==1;
    }

   

}