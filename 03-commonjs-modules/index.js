const {myName, myFavoriteNumber, myHobbies} = require('./multiple-export')
// Переименуем переменную myName, так как с таким названием уже есть
const {myName: myOtherName, myFriendsName} = require('./export-and-import')
const greeting = require('./my-modules/single-export')

console.log(myName) // Dima
console.log(myFavoriteNumber) // 64
console.log(myHobbies) // ['Swiming', 'Boxing', 'Cycling']

myHobbies.push('Clibing')

greeting(myName) // Hello Dima

console.log(myOtherName) // Dima
console.log(myFriendsName) // Dasha