const {ccclass, property} = cc._decorator;
import MdGame from '../module/MdGame';
import LData from '../manager/LData';
import Card from './Card';


@ccclass
export default class Word extends cc.Component {


    @property(cc.Label)
    zi: cc.Label = null;

    public setData(zi:string)
    {
       this.zi.string=zi;

       this.gary();
    }

    public static Liang:cc.Color=new cc.Color(255,0,0);
    public static Gary:cc.Color=new cc.Color(0,0,0);

    public liang()
    {
       
       this.zi.node.color=Word.Liang;
       this.zi.node.opacity=255
    }

    public gary()
    {
       

       this.zi.node.color=Word.Gary;
       this.zi.node.opacity=100

    }
   

}