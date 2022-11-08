// TODO: tampilkan teks pada notes.txt pada console.

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// https://stackoverflow.com/questions/64383909/dirname-is-not-defined-in-node-14-version
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileReadCb = (error, data) => {
  if(error) {
    console.log('Gagal membaca berkas');
    return;
  }
  console.log(data);
}

fs.readFile(resolve(__dirname, 'notes.txt'), 'UTF-8', fileReadCb);