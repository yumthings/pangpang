import Log from "../util/Log";

export default class HttpImg
{

    private static daili="https://images.weserv.nl/?url=";

    //预加载图片
    public static preDownImg(url)
    {
      // 远程 url 不带图片后缀名，此时必须指定远程图片文件的类型
         url = this.daili+url;
        cc.loader.load({url: url, type: 'png'}, function (err,sprite) {

            if(sprite==null)
            {
                Log.error("预加载图片失败---"+url);
            }
            else
            {
                Log.error("预加载图片成功---"+url);
            }
            
        });
    }

    public static downImg(url,call)
    {
        url = this.daili+url;
        cc.loader.load({url: url, type: 'png'}, function (err,sprite) {

            if(sprite==null)
            {
                Log.error("预加载图片失败---"+url);
                call(null);
            }
            else
            {
                call(sprite);
            }
            
        });

        Log.error("测试输出111---");
    }

    public static releaseImg(url)
    {
        url = this.daili+url;
       cc.loader.releaseRes(url);
    }

}