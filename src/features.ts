import { parse } from 'yaml';
import fs from 'fs';

interface BaseFeature {
    category: string,
    name: string,
    status: 'required' | 'optional',
    text: string,
}

export function getBaseFeatures() {

    const file = fs.readFileSync(__dirname + '/../base-features.yaml', 'utf8');
    const categories = parse(file);

    const ret : BaseFeature[] = [];

    Object.entries(categories).forEach(([categoryName, features] : [string, any]) => {

        Object.entries(features).forEach(([name, feature] : [string, any]) => {

            ret.push({
                category: categoryName,
                name,
                status: feature.$status,
                text: feature.$text,
            });

        });

    });

    return ret;

}

export function parseFeatures() {

    

}