
export default class Log {

    public static game_version:string="8.0.82";

    public static test : boolean = false;

    static info (message?: any, ...optionalParams: any[]){
        if(this.test){
            console.info(message, ...optionalParams);
        }
    }
    static log (message?: any, ...optionalParams: any[]){
        if(this.test){
            console.log(message, ...optionalParams);
        }
    }
    static warn (message?: any, ...optionalParams: any[]){
        if(this.test){
            console.warn(message, ...optionalParams);
        }
    }
    static error (message?: any, ...optionalParams: any[]){
        if(this.test){
            console.error(message, ...optionalParams);
        }
    }
    
}