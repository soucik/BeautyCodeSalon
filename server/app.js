var express = require('express')
	, app = express()
	, http = require('http')
	, request = require('request')
	, rp = require('request-promise')
	, server = http.createServer(app)
	, io = require('socket.io').listen(server);

server.listen(8080);

var keys_private = require('./private/keys_private.js');

function ImagesFromIdResolver() {
	this._baseUrl = 'https://graph.facebook.com/v2.10/';
	this._access_token = keys_private.access_token();
	this._images = new Array();
}

ImagesFromIdResolver.prototype.getUrlFromId = function (photoId) {
	let photosUrlsWithIds = this._baseUrl + photoId + '/picture' + '?fields=url' + '&type=' + 'album' + '&access_token=' + this._access_token;
	console.log(photosUrlsWithIds);
	rp(photosUrlsWithIds)
		.then(res => { return res.url });
}

app.use(express.static(__dirname + '/public'));

var resolver = new ImagesFromIdResolver();

////////////////////////////////////////////////////////////
//	request:	/
//	response:	index.html
//	http://localhost:8080/
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

////////////////////////////////////////////////////////////
//	request:	/BeautyCodeSalon/album/:albumId
//	response:	data:[{created_time: "date", id: "value"},{created_time: "date", id: "value"}]
//	http://localhost:8080/BeautyCodeSalon/album/10204426332601677
app.get('/BeautyCodeSalon/album/:albumId', function (request, response) {
	var options = {
		method: 'GET',
		uri: resolver._baseUrl + request.params.albumId + '/photos?access_token=' + resolver._access_token,
		json: true
	};
	rp(options)
		.then((res) => {
			response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
			return response.send(res.data);
		})
});

////////////////////////////////////////////////////////////
//	request:	/BeautyCodeSalon/photoUrl/:photoId/:type
//	response:	{"url":"value","id":"value"}
//	http://localhost:8080/BeautyCodeSalon/photoUrl/10204426332841683/album
app.get('/BeautyCodeSalon/photoUrl/:photoId/:photoType', function (requestClient, result) {
	photosUrlsWithIds = resolver._baseUrl + requestClient.params.photoId + '/picture' + '?' + 'type=' + requestClient.params.photoType + '&fields=url&redirect=false&access_token=' + resolver._access_token;
	console.log(photosUrlsWithIds);
	var request = require('request');
	request(photosUrlsWithIds, function (err, res, body) {
		if (err) {
			console.log(err);
		}
		if (res.statusCode) {
			result.setHeader('Content-Type', 'image/jpeg');
			result.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
			var responseData = {
				url: JSON.parse(body).data.url,
				id: requestClient.params.photoId,
				photoType: requestClient.params.photoType
			}
			result.send(JSON.stringify(responseData));
		}
	});
});

////////////////////////////////////////////////////////////
//	request:	/login
//	response:	login.html
//	http://localhost:8080/login
app.get('/login', function (req, res) {
	res.sendfile(__dirname + '/public/login.html');
});
var FB = require('fb');
fb = new FB.Facebook();

app.get('/go', function (req, res) {
	FB.api('1939772199430717', 'post', { 'message':'body', fields: [], access_token: keys_private.access_token() }, function (res) {

			if (!res || res.error) {
				console.log(!res ? 'error occurred' : res.error);
				return;
			}
			console.log(res.id);
			console.log(res.name);
		});
});

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = keys_private.rooms();

io.sockets.on('connection', function (socket) {

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function (username, room) {
		// store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		socket.room = room;
		// add the client's username to the global list
		usernames[username] = username;
		// send client to room 1
		socket.join(room);
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected to chat');
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'AF313C6D972BB5D01908CB9DA8EB1CB8A64FCCEFF96773BF0BC7275E21079B5D321A264E7B0DB0643C5C5D199FD19A1190EA984A78384FDE3B2BB31902A809B6');
	});

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function () {
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});
