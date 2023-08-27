import EventEmitter from 'events'

class Post extends EventEmitter {
    constructor (author, text) {
        super()
        this.author = author
        this.text = text
        this.likesQty = 0
        this.on('likePost', (username) => {
            console.log(`${username} liked your post`)
        })
    }

    like(username) {
        this.likesQty++
        this.emit('likePost', username)
    }
}

const myPost = new Post('Dima', 'Frontend developer')


myPost.like('Oleg')
setTimeout(() => myPost.like('Sasha'), 500)