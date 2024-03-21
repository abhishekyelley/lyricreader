import fs from 'fs';
import path from 'path';
import * as marked from 'marked';
import * as cheerio from 'cheerio';

import handleMissingFile from './handleMissingFile.js';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __curdirname = dirname(fileURLToPath(import.meta.url));
const __dirname = path.dirname(__curdirname);

const ARGS = process.argv;
const LYRIC_FILE_NAME = (ARGS[2] ? ARGS[2] : '_default') + '.md';

const $ = cheerio.load(fs.readFileSync('./public/template.html', 'utf8'));

await handleMissingFile(ARGS.includes('y'), LYRIC_FILE_NAME);


const markdownData = {
    data: '# Blank Data'
};

try {
    markdownData.data = fs.readFileSync(`./lyrics/${LYRIC_FILE_NAME}`, { encoding: 'utf8', flag: 'r' });
} catch (e) {
    console.error("Error getting Markdown Data:", e);
    markdownData.data = '# DATA_NOT_FOUND';
}

const parsedData = await marked.parse(markdownData.data);

// $('.App').empty(); // optional
$('.App').append(parsedData);

try {
    fs.writeFileSync('./public/index.html', $.html(), { encoding: 'utf8', flag: 'w' });
    console.log('HTML file generated successfully!');
    console.log(`Open in VS Code: vscode://file/${__dirname}/lyrics/${LYRIC_FILE_NAME}`);
} catch (e) {
    console.error(e);
}