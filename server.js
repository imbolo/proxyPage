var httpProxy=require('http-proxy');
var url=require('url');
httpProxy.createServer(function(req,res,proxy){
  if(!req.headers.fetchurl) return res.end('fetchurl must');
  var option=url.parse(req.headers.fetchurl);
  req.headers.host=option.host;
  req.url=req.headers.fetchurl;
  proxy.proxyRequest(req,res,{
    host : option.host,
    port : option.port||80
  });
}).listen(80);