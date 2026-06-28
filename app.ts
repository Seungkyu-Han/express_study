import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'node:path';
import session from 'express-session';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.set('port', process.env.PORT || 3000);

//프론트엔드 라우팅 용도
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET ?? '',
        cookie: {
            httpOnly: true,
            secure: false,
        },
    }),
);

app.use(
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        const err = new Error('Not Found');
        res.status(404);
        return next(err);
    },
);

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});
