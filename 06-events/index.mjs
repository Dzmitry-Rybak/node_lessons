import { EventEmitter } from 'events'

const myEmitter = new EventEmitter () // создаём новый экземпляр класса EventEmitter

function timeoutEvent (time, bye) {
    console.log(`Timeout event out in ${time} sec. ${bye}`)
}

myEmitter.on('timeout', timeoutEvent)

setTimeout(() => myEmitter.emit('timeout', 1, 'Bye!'), 1000)
setTimeout(() => myEmitter.emit('timeout', 2, 'bye!'), 2000)

// Слушатель события будет вызван только 1 раз
myEmitter.once('singleEvent', () => console.log('Single event'))
setTimeout(() => myEmitter.emit('singleEvent', 1), 1000)
setTimeout(() => myEmitter.emit('singleEvent', 2), 2000) // уже не вызовет событие singleEvent

 
setTimeout(() => myEmitter.off('timeout', timeoutEvent), 3000) // удалаяем событие 