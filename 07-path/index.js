const path = require('path')

const filePath = '/Users/dzmitryrybak/desktop/node/index.js' // абсолютный путь
const textFilePath = '/Users/dzmitryrybak/desktop/file.txt' // абсолютный путь
const relativePath = './node/movie.mov' // относительный путь
const directoryName = './node/subfolderm' // относительный путь

path.isAbsolute(filePath) // абсолютный этот путь или нет (true

path.basename(filePath) // возвращает последнюю часть в пути (index.js) 

path.dirname(filePath) // возвращает путь без названия файла (/Users/dzmitryrybak/desktop/node)

path.resolve(relativePath) // получим абсолютный путь для этой пути (/Users/dzmitryrybak/Desktop/node/node/movie.mov)

path.extname(relativePath) // получим расширение файла (.mov)

console.log(path.parse(filePath)) // получим распаршеный обект пути 
/* 
{
  root: '/',
  dir: '/Users/dzmitryrybak/desktop/node',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
*/