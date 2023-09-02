import fs from 'fs';
import { getBaseFeatures } from "../features";
import { getAllThemes } from "../themes";

const readme = fs.readFileSync(__dirname + '/../../README.md', 'utf8');

const newReadme = readme.replace(
    /<!-- START: FEATURES -->[\s\S]*<!-- END: FEATURES -->/,
    'New features',
);

const baseFeatures = getBaseFeatures();

const allThemes = getAllThemes();
console.log(allThemes);