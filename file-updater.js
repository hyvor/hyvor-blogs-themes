import Config from './config'
import axois from 'axois'
import fs from 'fs'
import ora from 'ora'

const folders = ['templates', 'styles', 'assets', 'lang'];

function fileUpdater(files, reset = false) {

    for (let i in files) {
        files[i] = Buffer.from(files[i]).toString('base64')
    }

    uuid = Config.get('uuid');

    const num = Object.keys(files).length
    const s = num === 1 ? "" : "s";
    const spinner = ora(`Syncing ${num} file${s}.`).start();

    axois.patch(`https://blogs.hyvor.test/api/cli/dev/${uuid}/files`, {
        files,
        reset
    })
    .then(() => {
        spinner.succeed();
    })
    .catch(e => {})

}

function updateAll() {

    let folds = folders.concat(['.'])

    let paths = {}
    
    folds.forEach(folder => {
        const files = fs.readdirSync(folder);   
        files.forEach(file => {
            const path = `${folder}/${file}`;
            if (fs.lstatSync(path).isDirectory()) 
                return;

            paths[file] = fs.readFileSync(path);
        });
    })

    fileUpdater(paths, true)

}


module.exports = {
    fileUpdater,
    updateAll 
}   