import dotenv from "dotenv";
dotenv.config({path:'./config/config.env'});
import express from "express";
import EmployeeRoute from './Routes/api/EmployeeRoute.js'
import connectDB from "./config/db.js";
import morgan from "morgan";
import swaggerUI from 'swagger-ui-express';
// import swaggerDocument from './swagger';
import bodyParser from "body-parser";
import exphbs from "express-handlebars"
import logger from "./logger.js";
import uniqueRandom from "unique-random";
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.sendGridApi)


const port = process.env.PORT || 5000;
const random = uniqueRandom(1, 10);

connectDB()

const app = express();

if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.engine('.hbs' , exphbs ({ defaultLayout: 'main' , extname: '.hbs'}))
app.set('view engine ' , '.hbs')
app.use(express.json())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/' , EmployeeRoute);
// app.use(
//     '/api-docs',
//     swaggerUI.serve, 
//     swaggerUI.setup(swaggerDocument)
//   );

 


app.listen(port, () => logger.info("server have started!!!"));
export {sgMail};
export default app;