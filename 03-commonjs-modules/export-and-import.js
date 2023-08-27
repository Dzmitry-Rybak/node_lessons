const {myName} = require('./multiple-export');

const myFriendsName = 'Dasha';

module.exports.myName = myName;
module.exports.myFriendsName = myFriendsName;
