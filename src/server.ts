import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import './database';
import Errors from './erros/Errors';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (erro: Error, request: Request, response: Response, _: NextFunction) => {
    if (erro instanceof Errors) {
      return response.status(erro.statusCode).json({
        status: 'error',
        message: erro.message,
      });
    }

    console.error(erro);
    return response.status(500).json({
      status: 'error',
      message: 'Ops... Aconteceu um erro inesperado',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started! 🔥');
});
