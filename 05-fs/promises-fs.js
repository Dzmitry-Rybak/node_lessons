const fs = require('fs/promises');

fs.writeFile('./first.txt', 'First file text')
    .then(() => {console.log('File first.txt was written')})
    .then(() => fs.appendFile('./first.txt', '\nOne More Line',))
    .then(() => console.log('Added new line'))
    .then(() => fs.rename('./first.txt', './renamed-first.txt',))
    .then(() => console.log('file was renamed'))
    .catch((err) => console.log(err))