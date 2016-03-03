var $ = require('jquery');
var template = require('./template.js');

var usersUrl = 'http://localhost:3000/users/';
var tweetsUrl = 'http://localhost:3000/tweets/';
var repliesUrl = 'http://localhost:3000/replies/'; 

// Post original tweet and render out new thread

    // new tweet threads
    function postTweet(user, message) {
        $.post(tweetsUrl, {
            userId: user.id,
            message: message
        })
         .then(function(data) {
            var thread = template.renderThread(user, data.message, null);
            $('#tweets').append(thread);
        })
        .fail(function (xhr) {
            console.log(xhr.status);
        });
    }


/// new replies
    function postReply(user, message, tweetId) {
        $.post(repliesUrl, {
            userId: user.id,
            tweetId: tweetId,
            message: message
        })
        .then(function(data) {
            var tweets = template.renderTweet(user, data.message, null);
            $('#' + tweetId).siblings('.replies').append(tweets);
        })
        .fail(function (xhr) {
            console.log(xhr.status);
        });
    }

	// current tweets & replies
    function loadTweets() {
         $.get(tweetsUrl)
            .then(function(tweets) {
                tweets.forEach(function(tweet) {
                    $.get(usersUrl + tweet.userId, function(tweetUser) {
                            $('#tweets').append(template.renderThread(tweetUser, tweet.message, tweet.id));                            
                        });
               });
            });

        $.get(usersUrl)
            .then(function(users) {
                users.forEach(function(user) {
                    $.get(usersUrl  +  user.id + '/replies')
                        .then(function(replies) {
                            replies.forEach(function(reply) {
                                var getReply = '#tweets #tweet-' + reply.tweetId;
                                $(getReply).siblings('.replies')
                                    .append(template.renderTweet(user, reply.message, null));
                            });
                        })
                            .fail(function (xhr) {
                                console.log(xhr.status);
                            });
                });
            });
    }


module.exports = {
	postTweet: postTweet,
	postReply: postReply,
	loadTweets: loadTweets,

};