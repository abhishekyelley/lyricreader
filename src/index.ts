import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'fs';
import * as marked from 'marked';
import * as cheerio from 'cheerio';

import handleMissingFile from './handleMissingFile.js';

const ARGS = process.argv;
const LYRIC_FILE_NAME = (ARGS[2] ? ARGS[2] : 'time-switch') + '.md';

await handleMissingFile(ARGS.includes('-y'), LYRIC_FILE_NAME);

const $ = cheerio.load(fs.readFileSync('./public/template.html', 'utf8'));

const markdownData = {
    data: '# Blank Data'
};

try {
    console.log(`./lyrics/${LYRIC_FILE_NAME}`);
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
} catch (e) {
    console.error(e);
}