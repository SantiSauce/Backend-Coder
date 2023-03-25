import {createLogger, format, transports } from 'winston'
import dotenv from 'dotenv'

dotenv.config()

const myFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp(),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);
const errorFormat = format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  );

const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

const devTransports = [
  new transports.Console({
    level: 'debug', 
    format: myFormat,
  }),
];

const prodTransports = [
  new transports.Console({
    level: 'info',
    format: myFormat,
  }),
  new transports.File({
    filename: "errors.log",
    level: "error",
    format: errorFormat,
  }), 
];

const devLogger = createLogger({
  levels: levels,
  transports: devTransports,
});

const prodLogger = createLogger({
  levels: levels,
  transports: prodTransports,
});


export const addLogger = (req, res, next) => {
    const enviroment = process.env.NODE_ENV;
    console.log(enviroment);
    
    req.logger = enviroment === 'production' ? prodLogger : devLogger
  
    // const date = new Date().toLocaleDateString();
    // req.logger.info(`METHOD: ${req.method}, ENDPOINT: ${req.url}, DATE: ${date}`);
  
    next();
}