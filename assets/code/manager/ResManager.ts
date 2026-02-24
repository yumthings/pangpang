
const {ccclass, property} = cc._decorator;

@ccclass
export default class ResManager
{
    public static getSprite(s:cc.Node,name:string)
    {
        let self = this;
 
        cc.loader.loadRes(name,cc.SpriteFrame,(err,sf:cc.SpriteFrame)=>{
      
            s.getComponent(cc.Sprite).spriteFrame = sf;
      
     });
    }
}