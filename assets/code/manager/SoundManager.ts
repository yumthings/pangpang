// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import LData from "./LData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SoundManager
 {

    public static sounds:any={};

    public static playSound(name)
    {
        if(LData.yx==false)
        {
            return;
        }

        if(this.sounds.hasOwnProperty(name)==true)
        {
            cc.audioEngine.playEffect(this.sounds[name],false);
        }
        else
        {
            cc.resources.load("sound/"+name, cc.AudioClip, null, (err, clip) => {
                
                if(clip!=null)
                {
                    this.sounds[name]=clip;

                    cc.audioEngine.playEffect(clip, false);
                }
               
            });
        }
    }

    public static playBgm(name)
    {

        if(this.sounds.hasOwnProperty(name)==true)
        {
            cc.audioEngine.playMusic(this.sounds[name],true);
        }
        else
        {
            cc.resources.load("sound/"+name, cc.AudioClip, null, (err, clip) => {
                
                if(clip!=null)
                {
                    this.sounds[name]=clip;

                    cc.audioEngine.playMusic(clip, true);
                }
               
            });
        }
    }


  
}
