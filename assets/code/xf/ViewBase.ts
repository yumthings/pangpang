

export default class ViewBase extends cc.Component
{

   

    public showView(data?:any)
    {
        if(this.node.parent!=null)
        {
            this.node.parent=null;
        }

        let s = cc.director.getScene();

        s.addChild(this.node);
    }

    public  hideView()
    {
        this.node.removeFromParent(false);
    }
   
}
