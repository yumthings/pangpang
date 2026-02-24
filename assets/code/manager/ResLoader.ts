
import JsonManager from './JsonManager';
import { Load } from './../../load/Load';
import PrefabManager from '../xf/manager/PrefabManager';
export default class ResLoader
{

    public static res_type=["prefab"];  //要加载的数量
    public static wc_count=0;//完成数量

    public static init()
    {
          for(var i=0;i<this.res_type.length;i++)
          {
              let type=this.res_type[i];

              if(type=="json")
              {
                  this.loadJsons();
              }
              else if(type=="prefab")
              {
                  this.loadPrefabs();
              }

          }
    }




    public static loadJsons()
    {
        JsonManager.load((res)=>{

            if(res==true)
            {
                this.completeLoad();
            }
            else
            {
                console.error("加载json资源出现问题");
            }
            
        });
    }

    public static loadPrefabs()
    {
        PrefabManager.loadPrefabs((res)=>{

            if(res==true)
            {
                this.completeLoad();
            }
            else
            {
                console.error("加载prefab资源出现问题");
            }}
        );
    }

  


    private static completeLoad()
    {
        this.wc_count++;

        if(this.wc_count==this.res_type.length)
        {
            cc.director.preloadScene("XMain",()=>{
                
                console.info("main场景预加载成功") 

                Load.inst.load_ok=true;
            });
        }
    }

}