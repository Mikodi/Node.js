const http = require('http');
const fs = require('fs');
const path = require('path');


const isFile = (path) => fs.lstatSync(path).isFile();

http.createServer((req, res) => {
    
    const fullPath = path.join(process.cwd(), req.url);
    let list = '';

    if (!fs.existsSync(fullPath)) {
        return res.end('File or directory not found');
    } 

    if (isFile(fullPath)) {
        return fs.createReadStream(fullPath).pipe(res);
    }


    fs.readdirSync(fullPath).forEach(fileName => {
        const data = path.join(req.url, fileName);
        if (isFile(path.join(process.cwd(), data))) {
            list += `<li><i class="fa fa-file" aria-hidden="true"></i><a href="${data}">${fileName}</a></li>`;
        } else {
            list += `<li><i class="fa fa-folder" aria-hidden="true"></i><a href="${data}">${fileName}</a></li>`
        }
    })

    const HTML = path.join(__dirname, 'index.html');
    const resultHTML = fs.readFileSync(HTML, 'utf-8').replace('Links', list);

    res.writeHead(200, {
        'Context-Type': 'text/html',
    })

    return res.end(resultHTML);
}).listen(5555, 'localhost');

