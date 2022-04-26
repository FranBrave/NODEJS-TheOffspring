import express from "express";
import { isAuth } from '../../middlewares/auth.middleware.js'
import { upload } from '../../middlewares/file.middleware.js';
import {
 getAllDiscs,
 createDisc,
 getDiscByID,
 editDisc,
 deleteDisc,
 findDiscByTitle,
 addTrack
} from '../controllers/disc.controller.js'


const router = express.Router();

router.get("/", getAllDiscs);
router.get("/:discID", getDiscByID);
router.get("/discByTitle/:title", findDiscByTitle)
router.post("/create", upload.single('image'), [isAuth], createDisc);
router.put("/edit/:discID", [isAuth], editDisc)
router.delete("/delete/:discID", [isAuth], deleteDisc)
router.put('/add-track', [isAuth], addTrack)


export { router };
