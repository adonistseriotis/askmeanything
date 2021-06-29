require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('../services/logger');

/* Include routes */
const indexRouter = require('../routes/indexRoute');
const usersRouter = require('../routes/getUserRoute');
const createUserRoute = require('../routes/createUserRoute');
const createQuestionRoute = require('../routes/createQuestionRoute');
const updateQuestionRoute = require('../routes/updateQuestionRoute');
const getQuestionRoute = require('../routes/getQuestionRoute');
const questionFeedRoute = require('../routes/questionFeedRoute');
const answerRoute = require('../routes/answerRoute');
const healthcheck = require('../routes/healthcheck');
const questionsPerKeyword = require('../routes/questionsPerKeywordRoute');
const questionsPerDay = require('../routes/questionsPerDayRoute');
const searchRouter = require('../routes/searchRoute');
const myquestionsRouter = require('../routes/myquestionsRoute');
const myanswersRouter = require('../routes/myanswersRoute')
const myquestionsPerDayRouter = require('../routes/myquestionsPerDayRoute');
const keywordsRouter = require('../routes/keywordsRoute');

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
        app.use('/', indexRouter);
        app.use('/getUser', usersRouter);
        app.use('/createUser', createUserRoute);
        app.use('/createQuestion', createQuestionRoute);
        app.use('/updateQuestion', updateQuestionRoute);
        app.use('/getQuestion', getQuestionRoute);
        app.use('/questionFeed', questionFeedRoute);
        app.use('/answer', answerRoute);
        app.use('/healthcheck', healthcheck);
        app.use('/questionsperkeyword', questionsPerKeyword);
        app.use('/questionsperday', questionsPerDay);
        app.use('/search', searchRouter);
        app.use('/myquestions', myquestionsRouter);
        app.use('/myanswers', myanswersRouter);
        app.use('/myquestionsperday', myquestionsPerDayRouter);
        app.use('/keywords', keywordsRouter);
        
        /* Start listening */

        this.server = app.listen(process.env.PORT, () => {
            logger.info(`Express running, now listening on port ${process.env.PORT}`)
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

