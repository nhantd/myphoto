/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

//var routes = require('./routes');
function getIPAddresses() {

    var ipAddresses = [];

    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                ipAddresses.push(alias.address);
            }
        }
    }

    return ipAddresses;
}
ip=getIPAddresses();
console.log(ip);

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.set('view engine', 'ejs');

app.get('/', function(req,res){
	//res.sendfile('public/poc.html');
	files = fs.readdirSync('./public/data');
	//console.log(files);
	res.render('index.ejs',{files: files});
});

app.post('/upload',function(req,res){
	file_data = req.body['file_data'].replace(/^data:image\/png;base64,/, '');
	file_type = req.body['file_type'];
	file_name = req.body['file_name'];
	var outputFilename = path.join(__dirname, 'public')+'/data/'+file_name + '.' + file_type;
	//console.log(file_type);

	fs.writeFile(outputFilename, file_data,'base64', function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("upload data saved to " + outputFilename);
		}
	}); 

	files = fs.readdirSync('./public/data');
	res.render('index.ejs',{files: files});
	/*res.writeHead(200, {'content-type': 'application/json'});
	res.write(JSON.stringify({ success: true }));*/
	//res.end();
});


app.post('/download',function(req,res){
	file_data = req.body['file_data_download'].replace(/^data:image\/png;base64,/, '');
	//file_type = req.body['file_type'];
	savename = new Date().toString().replace(/ /g,'-') +Math.floor(Math.random()*10000+1).toString()+ '.png';
	var outputFilename = path.join(__dirname, 'public')+'/download/' +savename;
	//console.log(file_data);

	fs.writeFile(outputFilename, file_data,'base64', function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("download data saved to " + outputFilename);
		}
	});
	var file = fs.createReadStream(outputFilename);
	res.writeHead(200, {"Content-Type" : "image/png"});
	file.pipe(res); 

/*	res.writeHead(200, {
	    'Content-Type': 'application/octet-stream',
	     //modification-date="date_object",
	    'Content-Disposition': 'attachment',
	     'filename' : 'public/upload/save.png' 
	  });*/
	//res.sendfile(outputFilename);
});

/*app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.set('view engine', 'ejs');
*/



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
