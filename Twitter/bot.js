var Twit = require('Twit');
console.log('bot is running');

var config = require('./config');

var T = new Twit(config);
// tweetIt();
// setInterval(tweetIt,2000*100);

var stream = T.stream('user');

stream.on('tweet',tweetEvent);

function tweetEvent(eventMsg) {
    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;

    console.log(replyto + ' ' + from);

    if(replyto === 'sumitkumar08011'){
        var newtweet = '@' + from + ' bot is working !!';
        tweetIt(newtweet);
    }
}

function tweetIt(message) {
    var r = Math.floor(Math.random()*100);

    var tweet = {
        // status: 'random number ' + r + ' #tweetbotworks'
        status: message
    }

    T.post('statuses/update',tweet,tweeted);
    
    function tweeted(err,data,response) {
        if(err){
            console.log(err);
        }else{
            console.log('it worked !!');
        }
    }
    
}