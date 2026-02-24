const {ccclass, property} = cc._decorator;
import PrefabManager from '../xf/manager/PrefabManager';
import ViewBase from '../xf/ViewBase';
import MdGame from './MdGame';
import LData from '../manager/LData';
import SoundManager from '../manager/SoundManager';


@ccclass
export default class MdHome extends ViewBase {

    private static _inst:MdHome;

    public static get inst()
    {
        if(this._inst==null)
        {
            let v=cc.instantiate(PrefabManager.getPrefab("HomeView"));

            this._inst=v.getComponent(MdHome);
        }

        return this._inst;
    }

    //开始游戏
    public startGame()
    {        
        SoundManager.playSound("btn");
        
         this.hideView();

         MdGame.inst.startGame();
    }
}