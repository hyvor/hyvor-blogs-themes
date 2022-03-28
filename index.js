process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import chokidar from 'chokidar';
import axois from 'axois';
import Config from './config'
import fs from 'fs'
import { updateAll, fileUpdater } from './file-updater'

const localDevUUID = Config.get('uuid');

if (!localDevUUID) {
  
    axois.post('https://blogs.hyvor.test/api/cli/new')
        .then(function ({ data: {uuid} }) {
            Config.update('uuid', uuid)
        })

}

updateAll();

chokidar.watch('.', {
    ignored: /(^|[\/\\])\../,
    followSymlinks: false,
    // only one folder level
    depth: 1,
    ignoreInitial: true
}).on('all', function(event, path) {

    let content;
    try {
        content = fs.readFileSync(path, 'utf8');
    } catch {
        // returns error on reading dir
        return;
    }

    fileUpdater({[path]: content})

});


/* const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); */