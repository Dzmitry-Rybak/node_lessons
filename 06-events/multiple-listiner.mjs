import { EventEmitter } from 'events'

const myEmitter = new EventEmitter();

myEmitter.on('myEvent', () => {
    console.log('First event listiner')
})

myEmitter.on('myEvent', () => {
    console.log('Second event listiner')
})

setTimeout(() => {
    myEmitter.emit('myEvent')
}, 1000)

myEmitter.getMaxListeners() // 10 - максимальное кол-во возможны слушателей у одного myEmitter
myEmitter.setMaxListeners(20) // задаём число 25 взможны слушателей для myEmitter


myEmitter.on('ontherEvent', () => console.log('OtherEvent'))
console.log(myEmitter.eventNames()) // [ 'myEvent', 'ontherEvent' ] - список событий