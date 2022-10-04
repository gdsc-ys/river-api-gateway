import morgan from 'morgan';
import logger from '../config/logger.config.js';

const format = () => {
    const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
    // const format = 'HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms';
    return format;
};

const stream = {
    write: (message) => {
        logger.info(message);
    },
};

const skip = (_, res) => {
    // if (process.env.NODE_ENV === 'production') {
    //     return res.ststusCode < 400;
    // }
    return false;
};

const morganMiddleware = morgan(format(), { stream, skip });

export default morganMiddleware;
