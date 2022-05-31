import { readFile } from 'fs/promises';
import { join } from 'path';
import formidable from 'formidable';
import Logger from '../utils/logger.mjs';

const routers = {};
const cwd = process.cwd();
const properties = { encoding: 'utf-8' };
const logger = new Logger(import.meta.url, cwd);

const serverResponse = (state, data) => ({ state, data });

routers['/'] = function(req, models) {
  return new Promise(resolve => {
    readFile(join(cwd, 'build/html/index.html'), properties)
    .then(result => resolve(result))
    .catch(err => {
      logger.log(err);
      readFile(join(cwd, 'build/html/404.html'), properties)
      .then(result => resolve(result))
      .catch(err => {
        logger.log(err);
        throw new Error('Unknown error!');
      });
    });
  });
};

routers['/getWords'] = function(req, models) {
  return new Promise(resolve => {
    const { method, url } = req;
    if (method !== 'POST') {
      logger.log(new Error('Must be POST method!'));
      resolve(serverResponse(0, 'Must be POST method!')); //request is locked
    } else {
      const form = formidable({ multiples: true });
      form.parse(req, (err, fields, files) => {
        if (err) {
          logger.log(err);
          resolve(serverResponse(0, `Something wrong with url: ${ url }!`));
        }

        const { partSpeech, limit, skip } = fields;
        models
        .then(model => {
          model['en'].getPartSpeech({ partSpeech, skip, limit })
          .then(result => {
            resolve(serverResponse(1, result));
          })
          .catch(err => {
            logger.log(err);
            resolve(serverResponse(0, err.message));
          });
        });
      });
    }
  });
};

routers['/getAmount'] = function(req, models) {
  return new Promise(resolve => {
    const { method } = req;

    if (method !== 'POST') {
      logger.log(new Error('Must be POST method!'));
      resolve(serverResponse(0, 'Must be POST method!'));
    } else {
      const form = formidable({ multiples: true });
      form.parse(req, (err, fields, files) => {
        if (err) {
          logger.log(err);
          resolve(serverResponse(0, `Something wrong with url: ${ url }!`));
        }

        const { partSpeech } = fields;

        models
        .then(model => {
          model['en'].getAmount(partSpeech)
          .then(result => {
            resolve(serverResponse(1, result));
          })
          .catch(err => {
            logger.log(err);
            resolve(serverResponse(0, err.message));
          });
        });
      });
    }
  });
};

export default routers;