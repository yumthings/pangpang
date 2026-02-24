const {ccclass, property} = cc._decorator;
import MdGame from './module/MdGame';


@ccclass
export default class Main extends cc.Component {

   

    onLoad(): void
    {
        
    }


    start () {

        MdGame.inst.showView();
    }


    

}