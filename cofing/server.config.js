import chalk from 'chalk';
import path from "path";
const devEnvPath = `${path.resolve('./')}/.env.development`;
const liveEnvPath = `${path.resolve('./')}/.env.production`;
const isDev = true;
const setupGlobalVariables = () => {
    global.ENV = process?.env ? process?.env : {};
    global.PORT = 5000;
    global.DEV = isDev;
    global.ENVPATH = isDev ? devEnvPath : liveEnvPath;
    // CONSOLE LOG UTILITYSi
    global.log = {
        success: (arg) => {
            console.log(chalk.bold.white(`${chalk.green('[Node:- success]')} ${arg}`));
        },
        warn: (arg) => {
            console.log(chalk.bold.blue(`${chalk.yellow('[Node:- warn]')} ${arg}`));
        },
        error: (arg) => {
            console.log(chalk.bold.red(`${chalk.yellow('[Node:- error]')} ${arg}`));
        },
    }
};
export default setupGlobalVariables();


