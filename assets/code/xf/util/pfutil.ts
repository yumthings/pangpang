export default class pfutil
{

    static GetPrefab(path, cb = null, thisobj = null) {
        cc.loader.loadRes(path, cc.Prefab, (err, prefab) => {
            cb && cb.apply(thisobj, [prefab]);
        });
    };

    public static random(min,max)
    {
        return min+ Math.floor(Math.random()*(max-min));
    }

    
    public static randSort(arr)
    {
        for(var i = 0,len = arr.length;i < len; i++ )
        {
              var rand = pfutil.random(0,arr.length);             
              var temp = arr[rand];
              arr[rand] = arr[i];
              arr[i] = temp; 
         }
    }

    //数组随机  洗牌算法
    public static shuffle(array) 
    {
        for (let i = array.length - 1; i >= 0; i--)
         {
             var random = Math.floor(Math.random() * (i))
             var t = array[random]
             array[random] = array[i]
             array[i] = t
         }
     }

    //获取年月日字符串
    public static day_str() 
    {
        var d = new Date();
        let str = '';
        str += d.getFullYear();
        str += d.getMonth() + 1;
        str += d.getDate();
        return str;
    }

    public static delEle(arr,ele)
    {
        let index = arr.indexOf(ele);
        if (index > -1) 
        {
            arr.splice(index, 1);
        }
    }
}