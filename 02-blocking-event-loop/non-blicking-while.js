const fs = require('fs')

let isRunning = true

setTimeout(() => isRunning = false, 10)

function setImmedietePromise() {
    return new Promise((resolve, reject) => {
        setImmediate(() => resolve())
    })
}

async function whileLoop() {
    while (isRunning) {
        console.log('While loop is running...')
        await setImmedietePromise();
    }
}

whileLoop().then(() => console.log('While loop enden'))
