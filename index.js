const server = require('./api/server');

const port = process.env.PORT || 8080;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})