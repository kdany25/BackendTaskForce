
import  createLogger from 'winston'
import  transports  from 'winston'
import format from "winston"
import winston from 'winston';


const  logger = winston.createLogger ({
        level : 'info'
})

export default logger