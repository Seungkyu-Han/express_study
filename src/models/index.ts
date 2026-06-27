import { Sequelize } from 'sequelize';
import config from '../config/config.json' with { type: 'json' };
import { User } from './user.js';
import { Lecture } from './lecture.js';

const env = process.env.NODE_ENV ?? 'development';

const dbConfig = config[env as keyof typeof config];

export const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password ?? '',
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect as 'postgres',
        logging: false,
    },
);

User.initModel(sequelize);
Lecture.initModel(sequelize);

User.hasMany(Lecture, {
    foreignKey: 'userId',
    as: 'lectures',
});

Lecture.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});
