import fs from 'fs'

/**
 * Reads config JSON file
 */

const fileName = './.hb.cli.json';

module.exports = class Config {

    static getAll() {

        let data = {}
        try {
            data = JSON.parse(fs.readFileSync(fileName));
        } catch (e) {

        }

        return data

    }

    static get(key) {

        return Config.getAll()[key] || null;

    }

    static update(key, value) {

        const data = Config.getAll()

        data[key] = value;

        Config.write(data)

    }

    static write(data) {

        fs.writeFile(fileName, JSON.stringify(data), err => {
            if (err) {
                console.error(err)
                return
            }
            console.log("Config Updated");
        })

    }

}