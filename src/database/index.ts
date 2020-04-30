import path from 'path';
import { Sequelize } from 'sequelize-typescript';

class Connection {
  constructor() {
    this.connect();
  }

  private async connect(): Promise<Sequelize> {
    try {
      const db = await new Sequelize({
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        storage: './src/__tests__/database.sqlite',
        operatorsAliases: false,
        logging: false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        // timezone: '-03:00',
        modelPaths: [path.normalize(`${__dirname}/../models`)],
        modelMatch: (filename, member) => {
          return (
            filename.substring(0, filename.indexOf('.model')) ===
            member.toLowerCase()
          );
        }
      });
      await db.sync();

      return db;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new Connection();
