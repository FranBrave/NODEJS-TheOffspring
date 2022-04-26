import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from "morgan";
import { router as discRoutes} from './app/api/routes/disc.routes.js'
import { router as songRoutes } from './app/api/routes/song.routes.js'
import { userRoutes } from './app/api/routes/user.routes.js'
import { connect } from './app/config/database.js';

import session from 'express-session';
import MongoStore from 'connect-mongo';


const __dirname = path.dirname(fileURLToPath(import.meta.url));


const PORT = process.env.PORT;
const server = express();
connect();

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello!');
});

server.use(express.json());
server.use(express.urlencoded({extended:true}))
server.use(logger("dev"));

server.use("/discs", discRoutes)
server.use("/songs", songRoutes)
server.use("/users", userRoutes)

server.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

server.listen(PORT, () => {
  console.log(`Node server listening on port http://localhost:${PORT}`);
});

//JWT
server.set("secretKey", "nodeRestApi");