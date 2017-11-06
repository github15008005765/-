/**
 * Ajax get请求方式方法封装;
 * ulr: 请求的url(请求的路径||接口);
 * data: 发送的数据;
 *       (1)约定:发送的数据格式是:key1=value1&key2=value2;
 * success: 请求成功之后的回调函数;
 */ 
function get(url,data,success){
    // 1.创建异步对象
    var xhr = new XMLHttpRequest();

    // 如果用户传入数据,把数据拼接到url的后面 url?key1=value1&key2=value2;
        if(data){
            url+='?';
            url+=data;
        }   
    // 2.设置请求行
    xhr.open('get',url);

    // 3.设置请求头(get请求可以省略)

    // 4.注册状态改变事件
    xhr.onreadystatechange = function(){
        // 4.1判断状态&请求是否成功并使用数据;
        if(xhr.status == 200 && xhr.readyState == 4){
            // responseText>响应回来的文本;
            // console.log(xhr.responseText);
            // success(xhr.responseText);

            // 判断数据的格式 返回不同的数据给用户
            // xhr.getResponseHeader 获取响应头的方法;(在响应头中 content-Type是键)
            var contentType = xhr.getResponseHeader('content-Type');
            // 判断键值对中的索引值方法:
            if(contentType.indexOf('json')!=-1){
                // 如果不等于-1   那就就有json这个符号,所以返回json格式的数据;
                success(JSON.parse(xhr.responseText));
            } else if(contentType.indexOf('xml')!=-1){
                // 如果不等于-1   那就就有xml这个符号,所以返回xml格式的数据;
                success(xhr.responseXML);
            }else{
                success(xhr.responseText);
            }
        }
    }   
    // 5.发送请求
    xhr.send(null);    

}



/**
 * Ajax post请求方式方法封装;
 * ulr: 请求的url(请求的路径||接口);
 * data: 发送的数据;
 * success: 请求成功之后的回调函数;
 */ 
/*
  用户可以选择发送哪种请求的工具函数
   url:请求的url
   type:请求的类型 get post
   data:发送的数据
      如果要发送数据 数据的格式是 key1=value1&key2=value2
  success:请求成功之后的回调函数
   参数的长度 过多,顺序不能修改
   造成使用的 麻烦
*/
function post(option) {
  // 1.创建异步对象
  var xhr = new XMLHttpRequest();
  // 判断请求方法 以及是否有数据
  if(option.type=='get'&&option.data){
    option.url+='?';
    option.url+=option.data;
    option.data = null;
  }
  // 2.请求行
  xhr.open(option.type, option.url);
  // 3.请求头
  if (option.type=='post'&&option.data) {
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  }
  //4.状态改变事件
  xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
      // 判断类型
      var contentType = xhr.getResponseHeader('Content-type');

      if (contentType.indexOf('json') != -1) {
        // 返回json
        option.success(JSON.parse(xhr.responseText));
      } else if (contentType.indexOf('xml') != -1) {
        // 返回xml
        option.success(xhr.responseXML);
      } else {
        option.success(xhr.responseText);
      }
    }
  }
  // 5.请求主体 发送
  xhr.send(option.data)
}