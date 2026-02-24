
import PrefabManager from './../xf/manager/PrefabManager';

export default class PoolManager
{
    public static objs:any={};

    public static get(key)
    {
       if(key in this.objs)
       {
          if(this.objs[key].length==0)
          {
             return null ;
          }
          else
          {
            return this.objs[key].pop();
          }
       }
       else
       {
          return null ;
       }
    }

    public static getPrefabObj(key)
    {
       if(key in this.objs)
       {
          if(this.objs[key].length==0)
          {
              return cc.instantiate(PrefabManager.getPrefab(key));
          }
          else
          {
              return this.objs[key].pop();
          }
       }
       else
       {
           return cc.instantiate(PrefabManager.getPrefab(key));
       }
    }



   public static put(key,obj:any)
   {
         if(key in this.objs)
         {
            this.objs[key].push(obj);
         }
         else
         {
            this.objs[key]=new Array();
            this.objs[key].push(obj);
         }
   }

}