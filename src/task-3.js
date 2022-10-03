
import csv from 'csvtojson'
import fs from 'fs'
import os from 'os'
import path from 'path'

const OUTPUT = path.resolve(__dirname, './output/output.txt');
const INPUT = path.resolve(__dirname, './csv/nodejs-hw1-ex1.csv');

fs.writeFileSync(OUTPUT, '');

csv()
    .fromFile(INPUT)
    .on('data', data => {
        const jsonStr = data.toString('utf8').split(os.EOL)[0];
        fs.appendFileSync(OUTPUT, jsonStr + '\n');
    })
    .on('error', err => {
        console.error(err)
    })