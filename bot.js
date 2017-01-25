const Twit = require('twit');
// const T = new Twit();
const congress = require('./congress').objects;

let query = 'tillis';

// console.log(congress[0].person.name)

// if (twitterid) return 'contact ' + twitterid + ' at'

const findOfficialByName = function(query){
    let matches = [], queryArr = query.split(' ');
    for (var i = 0; i < congress.length; i++){
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

const reply = function(tweet){
    // Who is this in reply to?
    var reply_to = tweet.in_reply_to_screen_name;
    // Who sent the tweet?
    // var name = tweet.user.screen_name;
    var name = 'gary';
    // What is the text?
    // var txt = tweet.text;
    var txt = tweet;
    txt = txt.replace(/@a2zitp/g,'');
    var reply = '@'+name + ' ';
    let official = findOfficialByName(txt);
    if (official.length === 1){
        official = official[0];
        reply += 'contact ' + official.person.name + ' at ' + official.phone;
    } else {
        reply += 'please be more specific with your query'
    }
    return reply;
}

let f = reply(query);
console.log(f);