// console.log(process.argv) // [ '/usr/local/bin/node', '/Users/dzmitryrybak/Desktop/node/09-streams/createfile.mjs'] - Аргументы которые у есть в терминале
// performance.now() -  Возвращает количество миллисекунд, прошедших с начала навигации

import fs from 'fs';
import path from 'path';

if (!process.argv[2] || !process.argv[3]) {
    console.log('Filename and line qty must be supplied as arguments')
    process.exit(0) // выходим из программы с кодом выхода 0 (без ошибки)
}

const fileName = process.argv[2];
const fileQty = parseInt(process.argv[3]);

if(isNaN(fileQty)) {
    console.log('Line qty must be type of number')
    process.exit(0)
}

// const writeStream = fs.createWriteStream(filePath) // Создаём поток по созданию файла (путь)
const writeStream = fs.createWriteStream(path.join('./files', fileName)) // Код более надежный для работе на разныз ОС


// Blocking the main thread.

// for (let i = 1; i <= fileQty; i++) {
//     writeStream.write(`i\n`)
// }
// writeStream.end();


// Do not blocking the main thread, async:
const asyncLoopWithPromise = (stream, data) => {
    return new Promise((resolve, reject) => {
        stream.write(data, (error) => {
            if(error) {
                reject(error)
            } else {
                resolve()
            }
        })
    })
}

(async () => {
    for(let i = 1; i <= fileQty; i++) {
        try {
            await asyncLoopWithPromise(writeStream, `${i}\n`)
        } catch (error) {
            console.log(error)
        }
    }
    writeStream.end()
})();


writeStream.on('finish', () => {
    console.log('File was created');
  });