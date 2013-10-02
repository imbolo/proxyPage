var httpProxy=require('http-proxy');
var url=require('url');
httpProxy.createServer(function(req,res,proxy){
  var request_url="http://serverurl";
  var option=url.parse(request_url);
  if(!option.port) option.port=80;
  console.log(req.url);
  req.headers.fetchurl=req.url;
  req.headers.host=option.host;
  req.url='/';// url中不能带敏感关键词，否则会被zf拦截,所以这里我把url设置为了"/"真实的访问地址隐藏在fetchurl这个header中。
  proxy.proxyRequest(req,res,{
    host : option.host,
    port : 80
  });
}).listen(8787);