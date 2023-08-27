import { EventEmitter } from "events"
import fs from 'fs'

const fileEmitter = new EventEmitter();

fileEmitter.on('writeFiles', () => {
    console.log('File first.txt was written')
    fs.appendFile('./first.txt', '\nOne More Line', () => {
        fileEmitter.emit('appendFile')
    })
})

fileEmitter.on('appendFile', () => {
    console.log('Added new line')
    fs.rename('./first.txt', 'renamed-first.txt', () => {
        fileEmitter.emit('rename')
    })
})

fileEmitter.on('rename', () => {
    console.log('file was renamed')
})

fs.writeFile('./first.txt', 'First file text', () => {
    fileEmitter.emit('writeFiles')
})