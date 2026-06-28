import express from 'express';

export const pageRouter = express.Router();

pageRouter.use((req, res, next) => {
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

pageRouter.get('/', (req: express.Request, res: express.Response) => {
    res.render('profile', { title: 'My Profile' });
});

pageRouter.get('/join', (req: express.Request, res: express.Response) => {
    res.render('join', { title: 'Join' });
});

pageRouter.get('/', (req, res) => {
    const twits: any[] = [];
    res.render('main', {
        title: 'SNS',
        twits,
    });
});
