import './bootstrap';
import express from 'express';
import cookieParser from 'cookie-parser';

import routes from './routes';
import './database';

class AppServer {
  server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.excpetionHandling();
  }

  private routes() {
    this.server.use(routes);
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(cookieParser());
  }

  excpetionHandling() {
    this.server.use((err, req, res, next) => {
      return res.status(err.status).json(err);
    });
  }
}
export default new AppServer().server;
