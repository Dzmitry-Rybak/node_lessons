import fs from 'fs';

const fileName = './files/fifth.txt';
const copiedFileName = './files/copy-fifth.txt'

const readStream = fs.createReadStream(fileName); // создаём поток для чтения файла
const writeStream = fs.createWriteStream(copiedFileName); // создаём поток для записи файла

readStream.pipe(writeStream); // данные из одного потока перенаправляются в другой поток пока не возникнет событие 'end'

readStream.on('end', () => console.log('readStream ended')) 
writeStream.on('finish', () => console.log('File was copied'))
writeStream.on('close', () => console.log('writeStream was closed'))