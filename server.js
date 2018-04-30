/*A server-sent event is when a web page automatically gets updates from a server.

This was also possible before, but the web page would have to ask if any updates were available. With server-sent events, the updates come automatically.*/

var SSE = require('sse')
  , http = require('http');
 


var readline = require('readline');
var fs = require('fs');


var lineno = 0;
var text = [];
var myInterface = readline.createInterface({
  input: fs.createReadStream('lines.txt')
});

myInterface.on('line', function (line) {
            
            lineno++;
            var t =line;
    //console.log('Line number ' +  lineno + ': ' + line);
            text.push(t);
            
});



var val = 1;

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/event-stream', 'Access-Control-Allow-Origin': '*'});
  
    

    setInterval(function(){
        if(val < text.length){
            res.write("id: msg1\ndata: Line "+val + " :"+JSON.stringify(text[val])+ "\n\n");
            console.log(JSON.stringify(text[val]));
            val+=2;
            
        }
        
},2000);
    
    
    
});
 
server.listen(80, '127.0.0.1', function() {
  var sse = new SSE(server);
  sse.on('connection', function(client) {
    client.send('hi there!');
  });
});