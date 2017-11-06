##Ajax的实现原理步骤：
    +第1步.创建Ajax对象(创建异步对象):

        // 创建ajax对象
        var xhr = null;

        if(window.XMLHttpRequest){  
            xhr = new XMLHttpRequest();
        } else {
            //为了兼容IE6
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

    +第2步.设置请求行(连接服务器):
        //请求的参数(3个):GET/POST(方法)，请求地址(url)， 异步传输(async:true/false))

        xhr.open('GET',  'data.txt',  true);

    +第3步.设置请求头(get请求可以省略):
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    +第4步.注册状态改变事件(接收服务器返回后的处理函数):
        xhr.onload=function(){
            if(xhr.readyState == 4||xhr.status == 200){

                /*
                ** 每当readyState改变时，就会触发onreadystatechange事件
                ** readyState属性存储有XMLHttpRequest的状态信息
                ** 0 ：请求未初始化
                ** 1 ：服务器连接已建立
                ** 2 ：请求已接受
                ** 3 : 请求处理中
                ** 4 ：请求已完成，且相应就绪
                */
                /*
                ** Http状态码
                ** 1xx ：信息展示
                ** 2xx ：成功
                ** 3xx ：重定向
                ** 4xx : 客户端错误
                ** 5xx ：服务器端错误
                */
                success(xhr.responseText);
            }
        }
    +第5步.发送请求
        xhr.send();
	