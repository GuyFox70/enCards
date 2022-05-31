import { appendFile } from 'fs/promises';
import { join } from 'path';

const cwd = process.cwd();
const properties = { encoding: 'utf-8' };
let count = 0;

class Logger {
  #meta;
  #cwd;

  constructor(meta, cwd) {
    this.#meta = meta;
    this.#cwd = cwd;
  }

  getPath() {
    const start = this.#meta.indexOf(this.#cwd.replaceAll('\\', '/'));
    const end = parseInt(this.#cwd.length);
    return this.#meta.substring(start).substring(end);
  }

  log(err) {
    const rawDate = new Date();
    const date = rawDate.toLocaleString().split(',').join('');
    const path = this.getPath();

    if (process.env.MODE === 'development') {
      console.log(`${ date } - ${ path } - ${ err.message }`);
    } else {
      count++;
      const resultStr = `${ count }. ${ date } - ${ path } - ${ err.message };\n`;
      appendFile(join(cwd, `log/${ date[0] }.txt`), resultStr, properties);
    }
  }
}

export default Logger;