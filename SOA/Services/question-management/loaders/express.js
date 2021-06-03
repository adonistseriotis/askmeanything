require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('../services/logger');

/* Include routes */
const createQuestionRoute = require('../routes/createQuestion');
const getQuestionRoute = require('../routes/getQuestion');
const questionFeedRoute = require('../routes/questionFeed');
const answerRoute = require('../routes/answer');

class ExpressLoader {
    constructor () {
        const app = express();
        /* CORS headers */
        app.use(cors());
        app.options('*',cors());

        /* Error handler */
        app.use(ExpressLoader.errorHandler);

        /* Middleware */
        app.use(morgan('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());

        /* Routing */
        app.use('/createQuestion', createQuestionRoute);
        app.use('/getQuestion', getQuestionRoute);
        app.use('/questionFeed', questionFeedRoute);
        app.use('/answer', answerRoute);
        
        /* Start listening */

        this.server = app.listen(process.env.PORT, () => {
            logger.info(`Express running, now listening on port ${process.env.PORT}`);
            console.log(`Express running, now listening on port ${process.env.PORT}`)
        })

    }

    get Server () {
        return this.Server;
    }

    static errorHandler (error, req, res, next) {
        let parsedError;

        try{
            parsedError = (error && typeof error === "object") ? JSON.stringify(error) : error;

        }
        catch (e) {
            logger.error(e);
        }

        logger.error(parsedError);

        if(res.headersSent) {
            return next(error);
        }

        res.status(400).json( {
            success: false,
            error
        });
    }
}



module.exports = ExpressLoader;

