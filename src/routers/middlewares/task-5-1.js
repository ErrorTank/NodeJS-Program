import Logger from "../../logger";

const exposeApiDetails = async (req, res, next) => {
    Logger.info('Request Method: %s', req.method);
    Logger.info('Request URI: %s', req.originalUrl);
    Logger.info('Reqeust Params: %j', req.params);
    Logger.info('Request Queries: %j', req.query);
    next();
}

export default exposeApiDetails;