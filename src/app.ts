import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import multer from 'multer';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, uploadDir);
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, `${Date.now()}${ext}`);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'secret'));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || 'secret',
        cookie: {
            httpOnly: true,
            secure: false,
        },
        name: 'session',
    }),
);

app.use((req, res, next) => {
    console.log('미들웨어 지나갑니다.');
    next();
});

app.post("/file", upload.single("file"), (req, res) => {
    console.log(req.file);
    res.send(req.file);
})

app.listen(app.get('port'), () => console.log('Server on'));
