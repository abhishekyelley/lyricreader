import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'fs';

function writeToNewFile(LYRIC_FILE_NAME: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const writeStream: { stream?: fs.WriteStream } = {};

        writeStream.stream = fs.createWriteStream(`./lyrics/${LYRIC_FILE_NAME}`);
        writeStream.stream.write(`# *${LYRIC_FILE_NAME.slice(0, -3).toUpperCase()}*\r\n`);
        writeStream.stream.write(`> *Write your lyrics here*`);
        writeStream.stream.end();

        writeStream.stream.on('finish', () => {
            console.log("FILE CREATED!");
            resolve();
        });
        writeStream.stream.on('error', (err) => {
            console.error("COULD NOT CREATE FILE!");
            reject(err);
        });
    })
}
/**
 * Asks user if a new file is to be created.
 * 
 * If yes, the file is created.
 * 
 * Otherwise process is terminated.
 */
export default async function handleMissingFile(ARGS_INCLUDE_Y: boolean, LYRIC_FILE_NAME: string) {
    if (fs.existsSync(`./lyrics/${LYRIC_FILE_NAME}`))
        return;

    const rl = readline.createInterface({
        input: input as NodeJS.ReadableStream,
        output: output as NodeJS.WritableStream
    });

    try {
        if (ARGS_INCLUDE_Y) {
            await writeToNewFile(LYRIC_FILE_NAME);
            return;
        }

        const makeNewFile = await rl.question(`Given file: ${LYRIC_FILE_NAME} doesn't exist. Would you like to create one (Y/N)?`);

        if (makeNewFile === 'y' || makeNewFile === 'Y') {
            await writeToNewFile(LYRIC_FILE_NAME);
            rl.close();
            return;
        } else {
            throw new Error("Create permission denied.");
        }
    } catch (e) {
        console.error(e);
        console.log(`EXITING PROCESS!`);
        rl.close();
        process.exit(1);
    }
}