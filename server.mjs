import { createServer } from 'http';
import { join, extname } from 'path';
import { readFile } from 'fs/promises';
import routers from './routers/index.mjs';
import Logger from './utils/logger.mjs';
import initModels from './db/initModels.mjs';
import Validator from './utils/validator.mjs';

const port = process.env.PORT || 5000;
const cwd = process.cwd();
const properties = { encoding: 'utf-8' };
const logger = new Logger(import.meta.url, cwd);
const models = initModels();
const { isHtml } = new Validator();

const mime = {
  html: 'text/html, charset="UTF-8',
  css: 'text/css, charset="UTF-8"',
  mjs: 'application/javascript, charset="UTF-8"',
  svg: 'image/svg+xml',
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  woff: 'font/woff',
  woff2: 'font/woff2',
  json: 'application/json, charset="UTF-8"',
  ico: 'image/x-icon'
};

const convert = {
  string: s => s,
  object: obj => JSON.stringify(obj),
  array: arr => JSON.stringify(arr),
};

const server = createServer(async (req, res) => {
  const { url } = req;
  if (url.endsWith('.ico')) {
    getFiles(res, url === '/favicon.ico' ? '/images/favicon.ico' : url);
  } else if (/(\.mjs|\.js|\.css|\.svg|\.png|\.jpg|\.jpeg|\.woff|\.woff2)$/.test(url)) {
    getFiles(res, url);
  } else {
    const router = routers[url];

    if (!router) {
      logger.log(new Error(`Url ${ url } not found!`));
      
      readFile(join(cwd, 'build/html/404.html'), properties)
      .then(result => {
        res
        .writeHead('404', { 'Content-type': 'text/html' })
        .end(result);
      });
      return;
    }

    router(req, models)
    .then(result => {
      const type = typeof result;
      res
      .writeHead(200, { 'Content-type': isHtml(result) ? mime['html'] : 'text/plain; charset utf-8' })
      .end(convert[type](result));
    })
    .catch(err => {
      get500Error(res, err);
    });
  }
});

server.listen(port, () => { console.log(`Server listen port ${ port }`) });

server.on('error', err => {
  get500Error(res, err);
});

async function getFiles(res, url) {
  try {
    const data = await readFile(join(cwd, `build${url}`));
    res
    .writeHead(200, { 'Content-type': mime[ extname(url).substring(1) ] })
    .end(data); 
  } catch (err) {
    logger.log(err);
    res
    .writeHead(404, { 'Content-type': mime['html'] })
    .end(`<p>File not found ${ url }</p>`);
    return;
  }
}

async function get500Error(res, err) {
  readFile(join(cwd, 'build/html/500.html'), properties)
  .then(result => {
    res
    .writeHead('500', { 'Content-type': 'text/html' })
    .end(result);
  });
}