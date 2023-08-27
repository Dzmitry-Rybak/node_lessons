const fs = require('fs');

fs.writeFile('./first.txt', 'First file text', (err) => {
    if(err) {
        console.log('err')
    } else {
        console.log('File first.txt was written')

        fs.appendFile('./first.txt', '\nOne More Line', (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Added new line')
                fs.rename('./first.txt', './renamed-first.txt', (err) => {
                    err ? console.log('err') : console.log('file was renamed')
                })
            }
    })
    }
})

