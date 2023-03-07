import { ErrorsTypes } from "../01-Utils/helpers.js";
import ClientError from "../03-Models/client-error.js";

const errorsHandler = (err, req, res, next)=>{
  if(err instanceof Error){
    res.status(err.status || 500).send(err.message);
    return;
  };
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send(ErrorsTypes.APP_JSON_MISSING);
    return;
  };
  if (err instanceof ClientError) {
    res.status(err.status).send(err.message);
    return;
  }

  next();
};

export default errorsHandler;