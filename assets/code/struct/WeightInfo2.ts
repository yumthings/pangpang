export default class WeightInfo2
{
   public id:number
   public weight:number;
   public val1:number;
   public val2:number;
   public val3:number;
   public val4:number;
   public val5:number;
   public val6:number;

   public constructor(id,weight,val1,val2,val3,val4,val5:number=0,val6:number=0)
   {
      this.id=id;
      this.weight=weight;
      this.val1=val1;
      this.val2=val2;
      this.val3=val3;
      this.val4=val4;
      this.val5=val5;
      this.val6=val6;
   }
}