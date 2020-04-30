import { Model } from 'sequelize-typescript';

export interface FactoryInterface {
  /**
   * Persist entity in database
   */
  create(...params: any): Promise<Model<any>>;
}
