var http=require('http');
var https=require('https');
var url=require('url');
var fs = require('fs');
var options = {
	key: fs.readFileSync('cert/privatekey.pem'),
	cert: fs.readFileSync('cert/certificate.pem')
};
//创建http服务器
http.createServer(options, function(req,res){
  //获得请求body
  var body='';
  req.on('data',function(chunk){
    body+=chunk;
  });
  req.on('end',function(){
    //代理请求
    if(!req.headers.fetchurl) return res.end('must have fetchUrl!');
    var request_url=req.headers.fetchurl;
    var option=url.parse(request_url);
    var httpObj='http:'==option.protocol?http:https;
    //发送header
    req.headers.host=option.host;
    option.path=option.path?option.path"\"static/image/smiley/default/shocked.gif\"" smilieid="\"6\"" border="\"0\"" alt="\"\"">ption.pathname+(option.search?option.search:'');//cloudfrondry上 url.parse 后 没有path这个下标
    req.headers.path=option.path;
    delete req.headers.fetchurl;
    option.method=req.method;
    option.headers=req.headers;
    httpObj.request(option,function(result){
      //设置header
      for(var key in result.headers){
        res.setHeader(key,result.headers[key]);
      }
      result.on('data',function(chunk){
        res.write(chunk);
      });
      result.on('end',function(){
        res.end();
      });
    }).on('error',function(error){
      res.end('remote http.request error'+error)}).end(body);
  });
}).listen(80);