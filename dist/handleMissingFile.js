import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'fs';
function writeToNewFile(LYRIC_FILE_NAME) {
    const writeStream = {};
    try {
        writeStream.stream = fs.createWriteStream(`./lyrics/${LYRIC_FILE_NAME}`);
    }
    catch (e) {
        console.error("COULD NOT CREATE FILE!");
        console.log(`PROCESS EXITING!`);
        process.exit();
    }
    writeStream.stream.write(`# *${LYRIC_FILE_NAME.slice(0, -3).toUpperCase()}*\r\n`);
    writeStream.stream.write(`> *Write your lyrics here*`);
    writeStream.stream.end();
}
export default async function handleMissingFile(ARGS_INCLUDE_Y, LYRIC_FILE_NAME) {
    if (!fs.existsSync(`./lyrics/${LYRIC_FILE_NAME}`)) {
        if (ARGS_INCLUDE_Y) {
            writeToNewFile(LYRIC_FILE_NAME);
            return;
        }
        const rl = readline.createInterface({
            input: input,
            output: output
        });
        const makeNewFile = await rl.question(`Given file: ${LYRIC_FILE_NAME} doesn't exist. Would you like to create one (Y/N)?`);
        if (makeNewFile === 'y' || makeNewFile === 'Y') {
            writeToNewFile(LYRIC_FILE_NAME);
            rl.close();
            return;
        }
        console.log(`PROCESS EXITING!`);
        rl.close();
        process.exit();
    }
}
