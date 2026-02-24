

import pfutil from "../xf/util/pfutil";

const { ccclass, property } = cc._decorator;

export default class LData
{

    public static yx:boolean=true;
    public static yy:boolean=true;
    public static zd:boolean=true;//震动


   //#region 

   public static str_datas: { [key: string]: string }={};

   public static getDataForStr(key,val?:string):string
   {
        if(this.str_datas[key]==null)
        {
            let str = cc.sys.localStorage.getItem(key);

            if(str==null || str=="")
            {
                str="";

                if(val)
                {
                    str=val;
                }

                this.str_datas[key]=str;
            }
            else
            {
                this.str_datas[key]=str;
            }
        }

        return this.str_datas[key];     
   }

   public static setDataForStr(key:string,val:string)
   {
       this.str_datas[key]=val;
       cc.sys.localStorage.setItem(key,val);
   }


   public static int_datas: { [key: string]: number }={};

   public static getDataForInt(key,val?:number):number
   {
        if(this.int_datas[key]==null)
        {
            let str = cc.sys.localStorage.getItem(key);

            if(str==null || str=="")
            {
                let v=0;

                if(val)
                {
                    v=val;
                }

                this.int_datas[key]=v;
            }
            else
            {
                this.int_datas[key]=parseInt(str);
            }
        }

        return this.int_datas[key];     
      
   }


   public static setDataForInt(key:string,val:number):any
   {
        this.int_datas[key]=val;
        cc.sys.localStorage.setItem(key,val+"");
   }




   
   public static set openid(id)
   {
      this.setDataForStr("openid",id);
   }

   public static get openid()
   {
        return this.getDataForStr("openid");
   }


   private static _userinfo:any=null;

   public static set userinfo(info)
   {
      this._userinfo=info;

      this.setDataForStr("userinfo",JSON.stringify(info));
   }

   public static get userinfo()
   {
        if(this._userinfo==null)
        {
            let str = this.getDataForStr("userinfo");

            if(str=="")
            {
                this._userinfo=null;
            }
            else
            {
                this._userinfo=JSON.parse(str);
            }           
        }

        return this._userinfo;        
   }


   public static set userid(id)
   {
      this.setDataForStr("userid",id);
   }

   public static get userid()
   {  
        let str = this.getDataForStr("userid");

        if(str=="")
        {
            str=""+Date.now()+pfutil.random(0,10000000);
            this.setDataForStr("userid",str);
        }

        return str;        
   }

   //#endregion


   public static set lv(level)
   {
      this.setDataForInt("level",level)
   }

   public static get lv()
   {
       return this.getDataForInt("level",1);
   }


   public static set isFirst(flag:boolean)
   {
      this.setDataForInt("first",flag==false?0:1)
   }

   public static get isFirst():boolean
   {
       return this.getDataForInt("first",1)==1?true:false;
   }
  

   public static set celldatas(str)
   {
      this.setDataForStr("cells",str)
   }

   public static get celldatas()
   {
       return this.getDataForStr("cells","");
   }


   
   public static set guide(flag)
   {
      this.setDataForInt("guide",flag)
   }

   public static get guide()
   {
       return this.getDataForInt("guide",1);
   }


}