import { DataTypes, Model, Sequelize } from 'sequelize';

export class Lecture extends Model {
    declare id: string;
    declare userId: string;
    declare name: string;
    declare createdAt: Date;

    static initModel(sequelize: Sequelize) {
        return Lecture.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    allowNull: false,
                    defaultValue: DataTypes.UUIDV4,
                },
                userId: {
                    field: 'user_id',
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                name: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                createdAt: {
                    field: 'created_at',
                    type: DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Lecture',
                tableName: 'lecture',
                timestamps: false,
                underscored: true,
            },
        );
    }
}
