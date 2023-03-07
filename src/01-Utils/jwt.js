import jwt from "jsonwebtoken";
import config from "./config.js";

const secretKey = process.env.SECRET_KEY || "for-safety";

export function getNewToken(user) {
  const payload = user; // payload = object containing our user.
  const token = jwt.sign(payload, secretKey, { expiresIn: config.loginExpiresIn });
  return token;
}

export function verifyToken(request) {
  return new Promise((resolve, reject) => {
    try {
      // If missing authorization header:
      if (!request.headers.authorization) {
        resolve(false);
        return;
      }
      // Here we have authorization header...
      // authorization format: "Bearer the-token"
      //                        01234567
      const token = request.headers.authorization.substring(7);
      // If missing token: 
      if (!token) {
        resolve(false);
        return;
      }
      // Here we have a token...
      // Verify token: 
      jwt.verify(token, secretKey, (err, payload) => { // payload = { user: { firstName: ___, } }
        // If token invalid (expires / wrong format...):
        if (err) {
            resolve(false);
            return;
        }
        // Token is valid: 
        resolve(true);
      });
    }
    catch (err) {
      reject(err);
    }
  });
};

// Must call that function only when token is verified:
export function getUserFromToken(token) {
  // // Get the token from the request:
  // const token = request.headers.authorization.substring(7);
  // // Extract the payload: 
  const payload = jwt.decode(token);
  // Extract the user form the payload:
  const user = payload;
  return user;
};
