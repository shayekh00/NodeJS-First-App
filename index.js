const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // //Normalhtmlrequest

    // if (req.url === '/') {
    //     fs.readFile(
    //         path.join(__dirname, 'public', 'index.html'),
    //         (err, content) => {
    //             if (err) throw err;
    //             res.writeHead(200, { 'Content-Type': 'text/html' });
    //             res.end(content);
    //         }
    //     );
    // }

    // //RestApi Request
    // if (req.url === '/api/users') {
    //     const users = [
    //         { name: 'Bob Smith', age: 40 },
    //         { name: 'JOhn Doe ', age: 30 }

    //     ]
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify(users));


    // }

    //BUILD FILE PATH DYNAMICALLY
    let filePath = path.join(__dirname, 'public',
        req.url === '/' ? 'index.html' : req.url);

    //Extension of the file
    let extname = path.extname(filePath);

    // Initial Content Type
    let contentType = 'text/html';

    //Check ext and set contetnt type
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    //Read File
    let file_404_Path = path.join(__dirname, 'public',
        req.url === '/' ? '404.html' : req.url);

    fs.readFile(filePath, (err, content) => {
        console.log("this worked");
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(file_404_Path, (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content);
                });
            }
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    });


    // res.end();


    let PORT = process.env.PORT || 5000;


});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));




//EVENTS SECTION
// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('message', (data) => console.log('Called Listener:', data));
// logger.log('Hello World');





//URL SECTION 

// const url = require('url');
// const myUrl = new URL('http://mywebsite.com:8000/hello.html?id=100&status=active');

// //Serialized URL
// console.log(myUrl.href);
// console.log(myUrl.toString());
// //Host(root domain)
// console.log(myUrl.host);
// //Hostname
// console.log(myUrl.hostname);
// //Pathname
// console.log(myUrl.pathname);
// //Serialized Query
// console.log(myUrl.search);
// //Search Params
// console.log(myUrl.searchParams);
// //Add Params
// console.log(myUrl.searchParams.append('abc', '123'));
// console.log(myUrl.searchParams);
// // Loop through params
// myUrl.searchParams.forEach((value, name) => console.log(`${name}:${value}`));