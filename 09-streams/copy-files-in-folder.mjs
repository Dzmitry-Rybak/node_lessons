// Копирование файлов из папки  ./files в папку ./copied-files при помощи потока

import fs from 'fs';
import path from 'path';

const folderDir = './files'
const copyFolderDir = './copied-files'

if (!fs.existsSync(folderDir)) {  // проверяем соществует ли такая директория 
    console.log(`Source dir ${folderDir} does't exist!`)
    process.exit(0)
}

if (fs.existsSync(copyFolderDir)) {
    fs.rmdirSync(copyFolderDir, { recursive : true, force : true}) // Если папка существует - удаляем эту папку, даже если в папке хранятся другие файлы
    // recursive - Это означает, что если директория содержит поддиректории или файлы, они также будут удалены.
    // force - удалить директорию и её содержимое, даже если они защищены от удаления
    console.log('"copyFolderDir" was removed')
}

fs.readdir(folderDir, (err, fileNames) => { // прочесть все файлы в папке по пути folderDir
    if (err) {
        console.log(err)
        process.exit(1)
    }
    fileNames.forEach((file, index) => { // fileNames - массив с файлами внутри папки
        const filePath = path.join(folderDir, file) // создадим путь - название папки + название файла
        const copyFilePath = path.join(copyFolderDir, `${index+1}. ${file}`) // создаём путь но ещё с именем новой папки

        const readStream = fs.createReadStream(filePath) // создаём поток для чтения файла
        const writeStream = fs.createWriteStream(copyFilePath) // создаём поток для записи файла
        readStream.pipe(writeStream) // поток для чтения направляем в поток для записи

        writeStream.on('finish', () => { // событие создастся после окончания комирования файла
            console.log(`File ${file} was copied`)
        })
    })
})





fs.mkdirSync(copyFolderDir)

// fs.access(folderDir, (error) => { // проверяем наличие пути
//     if (error) {
//         console.log(`Source dir ${folderDir} does't exists!`)
//         process.exit(0)
//     }
// })