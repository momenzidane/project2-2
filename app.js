/**With Chatgpt*/
const express = require('express');
// const middleware = require('./middleware');
const routes = require('./routes');
const { createError } = require('http-errors');
const app = express();

process.on('unhandledRejection', (reason) => {
    console.log("global handling :" + reason);
    process.exit(1);
});

/**
 * Middleware check
 */
middleware(app);

/**
 * Routers
 */
routes(app);

/**
 * Error Handling 404 (Not Found)
 */
app.use((req, res, next) => {
    const error = createError(404, "Page not found");
    next(error);
});

/**
 * General Error Handling
 */
app.use((error, req, res, next) => {
    // Ensure headers haven't already been sent
    if (!res.headersSent) {
        res.status(error.status || 500).json({
            status: false,
            message: error.message || "Internal Server Error"
        });
    }
});

module.exports = app;
