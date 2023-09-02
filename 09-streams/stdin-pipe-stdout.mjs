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
    transform(chunk, encoding, callback) {
        const arrOfChunk = chunk.toString().split(''); // Разбили полученную строку на массив
        const lastElem = arrOfChunk.pop(); // Доставли последний эллемент (переход на новую строку) из массива
        const reversedString = arrOfChunk.reverse().concat(lastElem).join('') // после переворачивания букв, добавлем переход на новую строку
        callback(null, reversedString)
    }
})

process.stdin.pipe(upperCaseStream)
             .pipe(reverseStream)
             .pipe(process.stdout)



// ---------------------------------------------------------------------------------------------------------------------------------------

// // Pipe to file
// const filePath = './files/stdin-dump.txt'
// const writeStream = fs.createWriteStream(filePath) // Создали поток на запись файлов

// process.stdin.pipe(writeStream) // перенаправляем поток данных консоли в поток который записывает данные в файл stdin-dump.txt

// // Pipe to stdout (в терминал)
// process.stdin.pipe(process.stdout)