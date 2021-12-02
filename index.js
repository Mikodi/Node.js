const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { uniqueNamesGenerator, adjectives, animals} = require('unique-names-generator');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, './index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

io.on('connection', client => {

    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, animals] });

    client.on('connect-user', () => {
        client.broadcast.emit('connection-user', randomName);
        client.emit('connection-user', randomName);
    })

    client.on('disconnect-user', () => {
        client.broadcast.emit('disconnection-user', randomName);
        client.emit('disconnection-user', randomName);
    })

    client.on('client-msg', data => {

        const payload = {
            name: randomName,
            message: data.message,
        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    })

});

server.listen(5555);
