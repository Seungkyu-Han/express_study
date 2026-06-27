import { DataTypes, Model, Sequelize } from 'sequelize';

export class User extends Model {
    declare id: string;
    declare name: string;
    declare age: number | null;
    declare remark: string | null;

    static initModel(sequelize: Sequelize) {
        return User.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    allowNull: false,
                },
                name: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                age: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                remark: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: 'User',
                tableName: 'users',
                timestamps: false,
                underscored: false,
            },
        );
    }
}
