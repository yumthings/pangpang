//发牌时候 发牌类型权重
import WeightInfo2 from '../struct/WeightInfo2';
import Log from '../xf/util/Log';
import pfutil from '../xf/util/pfutil';

export default class TypesWeight
{

    public static arr0:Array<WeightInfo2>=new Array();
    public static arr1:Array<WeightInfo2>=new Array();
    public static arr2:Array<WeightInfo2>=new Array();
    public static arr3:Array<WeightInfo2>=new Array();
    public static arr4:Array<WeightInfo2>=new Array();

    public static arr:Array<Array<WeightInfo2>>=new Array();

    public static init()
    {

        this.arr0.push(new WeightInfo2(1, 50, 1, 1, 1, 1));  
        this.arr0.push(new WeightInfo2(2, 30, 1, 1, 2, 2));
        this.arr0.push(new WeightInfo2(3, 20, 1, 1, 1, 2));
2
        this.arr1.push(new WeightInfo2(1, 30, 1, 1, 1, 1, 1, 1));  
        this.arr1.push(new WeightInfo2(2, 40, 1, 1, 1, 1, 2, 2));
        this.arr1.push(new WeightInfo2(3, 20, 1, 1, 2, 2, 2, 2));
        this.arr1.push(new WeightInfo2(4, 10, 1, 1, 2, 2, 1, 1));  

2
        this.arr2.push(new WeightInfo2(1,  10, 1, 1, 1, 1, 1, 1));  
        this.arr2.push(new WeightInfo2(2,  20, 1, 1, 1, 2, 2, 2));
        this.arr2.push(new WeightInfo2(3,  40, 1, 1, 2, 2, 3, 3));
        this.arr2.push(new WeightInfo2(4,  20, 1, 1, 2, 2, 1, 1));  
        this.arr2.push(new WeightInfo2(5,  10, 1, 1, 2, 3, 3, 3));  

2
        this.arr3.push(new WeightInfo2(1,  5, 1, 1, 1, 1, 1, 1));  
        this.arr3.push(new WeightInfo2(2,  20, 1, 1, 1, 2, 2, 2));
        this.arr3.push(new WeightInfo2(3,  30, 1, 1, 2, 2, 3, 3));
        this.arr3.push(new WeightInfo2(4,  25, 1, 2, 2, 3, 3, 3));  
        this.arr3.push(new WeightInfo2(5,  10, 1, 1, 2, 2, 1, 1));  
        this.arr3.push(new WeightInfo2(6,  10, 1, 2, 2, 2, 1, 1));  

        this.arr4.push(new WeightInfo2(1,  5, 1, 1, 1, 1, 2, 2));  
        this.arr4.push(new WeightInfo2(2,  20, 1, 1, 2, 2, 3, 3));
        this.arr4.push(new WeightInfo2(3,  25, 1, 2, 2, 2, 3, 3));
        this.arr4.push(new WeightInfo2(4,  15, 1, 2, 2, 3, 3, 3));  
        this.arr4.push(new WeightInfo2(5,  20, 1, 1, 2, 3, 1, 1));  
        this.arr4.push(new WeightInfo2(6,  15, 1, 2, 3, 3, 1, 1));  


        this.arr.push(this.arr0);
        this.arr.push(this.arr1);
        this.arr.push(this.arr2);
        this.arr.push(this.arr3);
        this.arr.push(this.arr4);
    }


    public static getData(index):WeightInfo2
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
                return arr[i];
            }
            else
            {
                w-=arr[i].weight;
            }
        }

        Log.error("权重算法出现问题");
    }


}
    