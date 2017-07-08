const http = require('http');
const fs = require('fs');
const goodsData = require('./public/goodsData.json');
const goodsInCart = require('./public/goodsInCart.json');

http.createServer((req, res) => {

    console.log(req.method);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    

    if (req.method === 'GET') {
        if (req.url.match(/cart$/)) {
            getProductsInCart().then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(data);
            });
        } else if (req.url.match(/list$/)) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(goodsData));
        }
    } else if (req.method === 'POST') {
        if (req.url.match(/unsetCart$/)) {
            fs.writeFile('./public/goodsInCart.json', '[]', (error) => {
                if (error) throw error;
                else {
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end('true');
                }
            })
        } else {
            req.on('data', function(newProduct) {
                let cart;
                getProductsInCart(true)
                .then(data => {
                    data.push(JSON.parse(newProduct));
                    data = JSON.stringify(data);
                    writeFile(data, done);

                    function done () {
                        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end('true');
                    }
                })
            });
        }
    } else if (req.method === 'PUT') {
        req.on('data', function(info) {
            info = JSON.parse(info);
            getProductsInCart(true)
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == info.id) {
                        if (info.quantity > 0) {
                            data[i].quantity = info.quantity;
                        } else {
                            data.splice(i,1);
                        }
                    }
                }
                data = JSON.stringify(data);
                writeFile(data, done)
                function done() {
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end('true');
                }
            })
        });
    } else if (req.method === 'DELETE') {
        const id = req.url.match(/\/.+$/)[0].slice(1);
        getProductsInCart(true)
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    data.splice(i,1);
                }
            }
            data = JSON.stringify(data);
            writeFile(data, done)
            function done() {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end('true');
            }
        })
    } else {
        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.end();
    }

    function getProductsInCart(needParse) {
        return new Promise (resolve => {
            fs.readFile('./public/goodsInCart.json', 'utf-8', (error, data) => {
                if (error) throw error;
                else {
                    if (needParse) {
                        data = JSON.parse(data);
                    }
                    resolve(data);
                }
            })
        })
    }

    function writeFile (data, done) {
        fs.writeFile('./public/goodsInCart.json', data, (error) => {
            if (error) throw error;
            else {
                done();
            }
        })
    }

}).listen(3000, () => console.log('Сервер работает'));