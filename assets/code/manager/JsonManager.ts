

export default class JsonManager
{

    // private static lvdata:Array<LevelInfo>;
    // private static zidata:Array<ZiInfo>;

    // private static zimap:Map<string,ZiInfo> =new Map();
    // private static zimap2:Map<string,ZiInfo> =new Map();


    public static load(call)
    {
        // cc.resources.loadDir("./json", (err, assets : cc.JsonAsset[])=>{

        //     if(assets!=null)
        //     {
        //         for(var i=0;i<assets.length;i++)
        //         {
        //             if(assets[i].name=="level")
        //             {
        //                 this.lvdata=assets[i].json;
        //             }
        //             else if(assets[i].name=="texts")
        //             {
        //                 this.zidata=assets[i].json;

        //                 for(let i=0;i<this.zidata.length;i++)
        //                 {

        //                     this.zidata[i].ps.sort();

        //                     if(this.zimap.has(this.zidata[i].text)==true)
        //                     {
        //                         console.error("咋回事,有重复字呀");
        //                     }
        //                     else{
        //                         this.zimap.set(this.zidata[i].text,this.zidata[i]);

        //                         let key = this.zidata[i].ps.join("_");

        //                         this.zimap2.set(key,this.zidata[i]);
        //                     }
        //                 }
        //             }
        //         }
        //         call(true);
        //     }
        //     else
        //     {
        //         call(false);
        //     }
          
        //  })
    }

    // public static getLvData(lv:number)
    // {
    //    return this.lvdata[lv-1];
    // }


    // public static getPsData(word:string)
    // {
    //     if(this.zimap.has(word)==false)
    //     {
    //         console.error("找不到--"+word+"--的数据");

    //     }

    //     return this.zimap.get(word).ps;
    // }

    // public static getDataForPS(key)
    // {
    //     if(this.zimap2.has(key)==false)
    //     {
    //       //  console.error("找不到--"+key+"--的数据");

    //         return null;
    //     }

    //     return this.zimap2.get(key).text;
    // }
    

}