const Twit = require('twit');
const t = require('./t');
const T = new Twit(t);
const stream = T.stream('user');

const congress = require('./congress').objects;

let query = 'tillis';

// console.log(congress[0].person.name)

// if (twitterid) return 'contact ' + twitterid + ' at'

const findOfficialByName = function(query){
    let matches = [], queryArr = query.split(' ');
    for (var i = 0; i < queryArr.length; i++){
        if (queryArr[i][0] === '@') queryArr.shift();
        else break;
    }
    for (i = 0; i < congress.length; i++){
        let subnames = 0;
        for (var j = 0; j < queryArr.length; j++){
            if (congress[i].person.name.toLowerCase().includes(queryArr[j].toLowerCase())) subnames++;
        }
        if (subnames === queryArr.length) matches.push(congress[i]);
    }
    console.log(queryArr);
    return matches;
}

/*
const testfindOfficialByName = function(){
    let failures = [];
    for (var i = 0; i < congress.length; i++){
        if (findOfficialByName(congress[i].person.name).length !== 1){
            failures.push(congress[i].person.name);
        }
    }
    return failures;
}
*/

function tweeted(err, reply) {
    if (err !== undefined) {
        console.log(err);
    } else {
        console.log('Tweeted: ' + reply);
    }
};

const replyWithInfo = function(tweet){
    // Who is this in reply to?
    var reply_to = tweet.in_reply_to_screen_name;
    if (reply_to === 'callmyrep') {
        // Who sent the tweet?
        var name = tweet.user.screen_name;
        // var name = 'gary';
        // What is the text?
        var txt = tweet.text;
        // var txt = tweet;
        console.log(txt);
        // txt = txt.replace(/@callmyrep/g,'');
        var reply = '@'+name + ' ';
        let official = findOfficialByName(txt);
        if (official.length === 1){
            official = official[0];
            official.person.twitterid ? 
            reply += 'contact @' + official.person.twitterid + ' at ' + official.phone :
            reply += 'contact ' + official.person.name + ' at ' + official.phone;
        } else {
            reply += 'please be more specific with your query'
        }
        // return reply;
        T.post('statuses/update', { status: reply }, tweeted);
    }
}

stream.on('tweet', replyWithInfo);

// let f = reply(query);
// console.log(f);