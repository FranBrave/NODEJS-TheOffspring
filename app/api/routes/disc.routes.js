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
router.post("/create", upload.single('image'), createDisc);
router.put("/edit/:discID", editDisc)
router.delete("/delete/:discID", deleteDisc)
router.put('/add-track', addTrack)


export { router };

// , [isAuth]
// , [isAuth]
// , [isAuth]
// , [isAuth]