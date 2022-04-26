import jwt from "jsonwebtoken"
import { httpStatusCode } from "../utils/httpStatusCode.js"



const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization) {
        return res.json({
            status: 401,
            message: httpStatusCode[401],
            data: null
        })
}

const [bearerString, bearerToken] = authorization.split(' ');
if (bearerString !== "Bearer") {
    return res.status(400).json ({
        status: 400,
        message: HTTPSTATUSCODE[400],
        data: null
  })
}
try {
  var token = jwt.verify(bearerToken, req.app.get('secretKey'));
} catch(err) {
  return next(err);
}

const authority = {
  id: token.id,
  email: token.email
};


req.authority = authority;
next();
}


export { isAuth }