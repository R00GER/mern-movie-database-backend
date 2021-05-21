const logger = (req, res, next) => {
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);
    console.log('BODY: ', req.body);
    console.log('STATUS: ', res.statusCode);
    console.log('-------------------------------');                            
    next();
}

export default logger;