import {Transform} from 'stream';
import fs from 'fs';

// Принимает readable stream и возвращает опять readable stream
const upperCaseStream = new Transform({
    transform: function(chunk, encoding, callback) {
        const upperCased = chunk.toString().toUpperCase();
        callback(null, upperCased)
    }
})

const reverseStream = new Transform({
    transform: function (chunk, encoding, callback) {
        const reversedString = chunk.toString().split('').reverse().join('')
        callback(null, reversedString)
    }
})

process.stdin.pipe(upperCaseStream).pipe(reverseStream).pipe(process.stdout)



// ---------------------------------------------------------------------------------------------------------------------------------------

// // Pipe to file
// const filePath = './files/stdin-dump.txt'
// const writeStream = fs.createWriteStream(filePath) // Создали поток на запись файлов

// process.stdin.pipe(writeStream) // перенаправляем поток данных консоли в поток который записывает данные в файл stdin-dump.txt

// // Pipe to stdout (в терминал)
// process.stdin.pipe(process.stdout)