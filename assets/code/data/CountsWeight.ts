//发牌时候 发牌数量权重
import WeightInfo from '../struct/WeightInfo';
import pfutil from '../xf/util/pfutil';
import Log from '../xf/util/Log';
export default class CountsWeight
{

    public static arr0:Array<WeightInfo>=new Array();
    public static arr1:Array<WeightInfo>=new Array();
    public static arr2:Array<WeightInfo>=new Array();
    public static arr3:Array<WeightInfo>=new Array();
    public static arr4:Array<WeightInfo>=new Array();

    public static arr:Array<Array<WeightInfo>>=new Array();

    public static init()
    {
        this.arr0.push(new WeightInfo(1, 60, 4));  
        this.arr0.push(new WeightInfo(2, 20, 3));
        this.arr0.push(new WeightInfo(3, 20, 2));

        this.arr1.push(new WeightInfo(1, 25, 6));  
        this.arr1.push(new WeightInfo(2, 30, 5));
        this.arr1.push(new WeightInfo(3, 35, 4));
        this.arr1.push(new WeightInfo(4, 10, 2));  

        this.arr2.push(new WeightInfo(1, 45, 6));  
        this.arr2.push(new WeightInfo(2, 35, 5));
        this.arr2.push(new WeightInfo(3, 10, 4));
        this.arr2.push(new WeightInfo(4, 10, 2));  

        this.arr3.push(new WeightInfo(1, 30, 6));  
        this.arr3.push(new WeightInfo(2, 35, 5));
        this.arr3.push(new WeightInfo(3, 25, 4));
        this.arr3.push(new WeightInfo(4, 5, 3));  
        this.arr3.push(new WeightInfo(5, 5, 2));  

        this.arr4.push(new WeightInfo(1, 30, 6));  
        this.arr4.push(new WeightInfo(2, 35, 5));
        this.arr4.push(new WeightInfo(3, 20, 4));
        this.arr4.push(new WeightInfo(4, 10, 3));  
        this.arr4.push(new WeightInfo(4, 5, 3));  

        this.arr.push(this.arr0);
        this.arr.push(this.arr1);
        this.arr.push(this.arr2);
        this.arr.push(this.arr3);
        this.arr.push(this.arr4);
    }

    public static getCount(index)
    {
        let arr=this.arr[index];

        let weight=0;

        arr.forEach((val)=>{

            weight+=val.weight;
        })

        let w=pfutil.random(0,weight);

        for(let i=0;i<arr.length;i++)
        {
            if(w<arr[i].weight)
            {
                return arr[i].val;
            }
            else
            {
                w-=arr[i].weight;
            }
        }

        Log.error("权重算法出现问题");
    }


}
    