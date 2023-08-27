const fs = require('fs')
const dns = require('dns')
const internal = require('stream')


function info(text) {
    console.log(text, performance.now().toFixed(2))
}

console.log('Programm start')


// Close events
fs.writeFile('./test.txt', 'Hello node.js', () => info('File written'))

// Promises
Promise.resolve().then(() => info('Promise 1'))

// nextTick
process.nextTick(() => info('next.Tick 1'))

// setImmeiate
setImmediate(() => info('Immediate 1'))

// Timeoust
setTimeout(() => info('Timeout 1'), 0)
setTimeout(() => {
    process.nextTick(() => info('next.Tick 2'))
    info('Timeout 2')
}, 100)

// Intervals
let internalCount = 0;

const intervalId = setInterval(() => {
    info(`Interval ${internalCount += 1}`)
    if(internalCount === 2) clearInterval(intervalId)
}, 50)

// I/O events
dns.lookup('localhost', (err, address, family) => {
    info('DNS 1 localhost')
    Promise.resolve().then(() => info('Promise 2'))
    process.nextTick(() => info('next.Tick 3'))
})

console.log('Programm end')