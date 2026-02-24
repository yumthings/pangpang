

export default class Http
{
    private static xhr:XMLHttpRequest;


    public static post(url)
    {
        return new Promise((resolve, reject) => 
        {
            let xhr = new XMLHttpRequest()
            xhr.timeout = 10000 //设置超时时间；

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                  
                    resolve(xhr.responseText);
                }
            };

            xhr.open("POST", url, true);
			xhr.send();
        });
    }

}
