const moment = require('moment');
 
// Middleware.
// Next, so that we can move to the next middleware function in the stack.
// Everytime we will go to thunder-client and make a request, Middleware is gonna run, it will print Hello in console.
const logger = (req, res, next) => {
    // console.log('Hello');
    // We can add date and time too, certain parts of the URL can be accessed with request objects.
    console.log(
        `$(req.protocol)://${req.get('host')}${
          req.originalUrl
        }: ${moment().format()}`
        );
    next();
}

module.exports = logger;