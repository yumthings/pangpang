import AdVideo from "../code/ad/AdVideo";
import ResLoader from "../code/manager/ResLoader";
import PrefabManager from "../code/xf/manager/PrefabManager";
import Plat from "../code/xf/Palt";
import SubLoad from "../code/xf/SubLoad";
import Log from "../code/xf/util/Log";
import AdBanner from './../code/ad/AdBanner';
import AdCustom_Up from './../code/ad/AdCustom_Up';
import AdIds from './../code/ad/AdIds';
import BackConfig from './../code/xf/manager/BackConfig';




const {ccclass, property} = cc._decorator;

@ccclass
export class Load extends cc.Component 
{
   
    @property(cc.Sprite)
    bar: cc.Sprite = null;

    @property(cc.Label)
    version: cc.Label = null;

    @property(cc.Label)
    hint: cc.Label = null;

    public static inst:Load;

    public load_ok=false;

    
    onLoad () {

        Load.inst=this;

       // cc.sys.localStorage.clear();

        console.log("第一个脚本--加载脚本--这里执行了哈哈哈111");

        this.version.string="v_"+Log.game_version+(Log.test==true?"_测试":"");

        this.flags[0]=0;

        this.scheduleOnce(this.startLoad,0.2);


    }


    private flags:Array<number>=new Array();

    public startLoad()
    {
        SubLoad.loadSub(()=>{

            ResLoader.init();           
        })

         Plat.init();
   
         AdVideo.init();
         AdBanner.show();
         AdCustom_Up.show();


        // BackConfig.init();
    }

    private p=40;

    private frame_ok:boolean=false;

     update () 
     {
     
        this.p+=0.5;

        if(this.p>98)
        {
            this.p=98;
        }

        if(this.p<10)
        {
            this.p=10;
        }

        this.bar.node.width=500*this.p/100;

        this.hint.string="加载资源中..."+Math.floor(this.p)+"%";


        if(this.p>90 && this.frame_ok==false && this.load_ok==true)
        {

            cc.director.loadScene("XMain",()=>{
                
                Log.info("main场景加载成功")
            });

        
            this.frame_ok=true;
        }
       

    }
     
}

