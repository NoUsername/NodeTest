var http = require('http');
var url = require('url');

var rooms = new Array();

function getCb(req, res) {
  if (req.method == "GET") {
    var parts = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    if (parts.query && parts.query.name && parts.query.nick) {
      var room = parts.query.name;
      var nick = parts.query.nick;
      res.write('you want to enter room ');
      res.write(parts.query.name);
      res.write('\n');
      var theRoom;
      if (rooms[room]) {
        var r = rooms[room];
        for (var i=0; i<r.length; i++) {
          if (r[i]) {
            r[i].write(nick);
            r[i].write(' joined the room\n');
          }
        }
        theRoom = r;
      } else {
        var newRoom = new Array();
        rooms[room] = newRoom;
        theRoom = newRoom;
      }
      theRoom.push(req.connection);
      res.write('joined room...');
    } else {
      res.write(req.url);
      res.write('\n');
      res.end('Hello World\n');
    }
    
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end();
  }
}

http.createServer(getCb).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');