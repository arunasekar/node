var http=require('http');
var fs=require('fs');
http.createServer(function(request,response){
    var url=request.url;
    switch(url){
        case'/':
getStaticFileContent(response,'C:/nodee/register.html','text/html');
break;
case'/login':
getStaticFileContent(response,'c:/nodee/login.html','text/html');
break;
case'/home':
getStaticFileContent(response,'c:/nodee/home.html','text/html');
break;
default:
response.writeHead(404,{'Content-Type':'text/plain'});
response.end('404- page not found');
    }
}).listen(4200);
console.log('server running at //http://localhost:4200');
function getStaticFileContent(response,filepath,contentype){
    fs.readFile(filepath,function(error,data){
        if(error){
            response.writeHead(500,{'Content-Type':'text/plain'});
            response.end('500-Internal server error.');
        }
        if(data){
            response.writeHead(200,{'Content-type':'text/html'});
            response.end(data);

        }
    });
}


