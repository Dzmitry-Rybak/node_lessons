function greeting (name) {
    console.log('Hello', name);
}

console.log(__filename) // получим путь к модулю

module.exports = greeting;



// Don't do this
// modele.exports будет по прежнему ссылаться на пустой объект {}
// exports = greeting;