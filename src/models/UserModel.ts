import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
  PrimaryKey,
  Unique,
  AutoIncrement,
  BeforeSave,
  DataType
} from 'sequelize-typescript';
import bcryptjs from 'bcryptjs';
@Table({
  tableName: 'users'
})
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id?: number;

  @Column
  public email: string;

  @Unique
  @Column
  public username: string;

  @Column({ type: DataType.VIRTUAL })
  public password;

  @Column
  public password_hash: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  public createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  public updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  public deletedAt: Date;

  @BeforeSave
  static async beforeSaveHook(user: User, options: any): Promise<void> {
    user.password_hash = await bcryptjs.hash(user.password, 8);
  }
}
