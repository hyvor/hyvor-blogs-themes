import * as fs from 'fs';
import path from 'path';

interface GetAllThemesOptions {
    ignoreBlank?: boolean,
}
interface GetAllThemesResult {
    name: string,
    path: string,
    ported: boolean,
}

export function getAllThemes({ ignoreBlank = true } : GetAllThemesOptions = {}) {

    const folders = [
        'original',
        'ported'
    ];

    const ret: GetAllThemesResult[] = [];

    folders.forEach(folder => {

        const folderPath = __dirname + '/../' + folder;

        const themes = fs.readdirSync(folderPath)
            .filter(name => !name.startsWith('.'));

        if (ignoreBlank) {
            themes.filter(name => name !== 'blank');
        }

        themes.forEach(name => {
                
            ret.push({
                name,
                path: path.resolve(folderPath, name),
                ported: folder === 'ported',
            });

        });

    });

    return ret;

}