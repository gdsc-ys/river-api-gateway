import express from 'express';
import morganMiddleware from './middleware/morgan.middleware.js';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = new express();

app.set('port', 4000);
app.set('trust proxy', true);

app.use(morganMiddleware);

// proxy setting
app.use(
    '/test',
    createProxyMiddleware({
        target: 'http://localhost:10000',
        changeOrigin: true,
        pathRewrite: { '^/test': '/hello-world' },
    })
);

// 404 Page_Not_Found
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} No such a router`);
    error.status = 404;
    next(error);
});

// Error Handling
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'production' ? {} : err;
    return res.status(err.status || 500).json({
        info: res.locals.error,
    });
});

export default app;
