
setTimeout(() => console.log('Timer'), 0)

function fib(n) {

    return new Promise((resolve, reject) => {
        if (n < 2) {
            return resolve(n)
        }
        setImmediate(() => {
            Promise.all([fib(n-1), fib(n-2)])
                .then(([fib1, fib2]) => {
                    resolve(fib1 + fib2)
                })
        })
    })
}

// Heap out of memory
fib(20).then((data) => console.log(data))