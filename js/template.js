'use strict';

var Handlebars = require('hbsfy/runtime');

var threadTmpl = require('../templates/thread.handlebars');
var tweetTmpl = require('../templates/tweet.handlebars');
var composeTmpl = require('../templates/compose.handlebars');


function renderTweet(user, message, id) {
	return	tweetTmpl({
		id: id,
		img: user.img,
		handle: user.handle,
		message: message
	});
}

function renderCompose() {
	return composeTmpl();

}

function renderThread(user, message, id) {
	return threadTmpl({
		tweet: renderTweet(user, message, id),
		compose: renderCompose()
	});
}


module.exports = {
	tweetTmpl: tweetTmpl,
	composeTmpl: composeTmpl,
	threadTmpl: threadTmpl,
	renderThread: renderThread,
	renderCompose: renderCompose,
	renderTweet: renderTweet
};