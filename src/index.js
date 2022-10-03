import app from './app.js';
import chalk from 'chalk';

app.listen(app.get('port'), () => {
    console.log(`Listening at Port ${chalk.bold.bgMagenta.white(`${app.get('port')}`)}...`);
    console.log(`NODE_ENV=${chalk.bold.bgBlue.white(`${process.env.NODE_ENV}`)}...\n`);
});
