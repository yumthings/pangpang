
export default class PrefabManager
{


    private static objs={};

    //加载预制体
    public static loadPrefabs(call)
    {

        cc.resources.loadDir("./pre/", (err, assets : cc.Prefab[])=>{
 
            if(assets!=null)
            {
                 for(let i=0;i<assets.length;i++)
                 {
                     this.objs[assets[i].name]=assets[i];
                 }
                 console.error("加载预制体成功");
                 call(true);
            }
            else
            {
                console.error("加载预制体失败");
                 console.error(err);
                 call(false);
            }
          
         })
     
      
    
    }

    public static getPrefab(name:string):cc.Prefab
    {

        if(this.objs.hasOwnProperty(name)==false)
        {
            console.error("没有找到预制体---"+name);
        }

        return this.objs[name];
    }
}