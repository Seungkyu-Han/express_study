import express from 'express';
import dotenv from 'dotenv';
import nunjucks from 'nunjucks';
import { sequelize } from './models/index.js';

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);

nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize
    .sync({ force: false })
    .then(() => {
        console.log('connect to database');
    })
    .catch(console.error);

app.listen(app.get('port'), () => console.log('Server on'));
