import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

//middleware function to check the request

function auth(req: Request, res: Response, next: NextFunction) {
  try {
    //get the cookies from the request
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ erroMessage: 'unauthorized' });
    }

    //validate the token to make sure it came from our app
    //jwt.verify will throw an error if the doesnt match the secret
    //if there is a match, jwt will decode the token and put the decoded payload into our variable
    //since we encoded the jwt with the object {user: id}, that is what will be returned
    const verified: any = jwt.verify(token, config.server.token.secret);

    //add the user to the request object, to be sent to the customerRoute handler
    //user is the id of the user
    req.body.userId = verified.user;
    //after verifying and adding what we need call next which will exit this function and go to the next one,
    //which is the handler function in customerRoute
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ erroMessage: 'unauthorized' });
  }
}

export default auth;
