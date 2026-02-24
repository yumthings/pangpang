export default class EnumCellState
{
    public static normal:number=0;//正常状态   
    public static unlock:number=1;//可解锁状态
    public static lock:number=2;//正常锁状态
    public static lock_next:number=3;//正常锁状态--下次可解锁
    public static temp_ad:number=4;//临时状态1--可播放广告
    public static temp_no_ad:number=5;//临时状态1--不播放广告
    public static temp_open:number=6;//临时开启状态1--不播放广告

}