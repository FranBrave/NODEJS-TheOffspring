import express from "express";
import {
 getAllDiscs,
 createDisc,
 getDiscByID,
 editDisc,
 deleteDisc,
 findDiscByTitle,
 addTrack
} from '../controllers/disc.controller.js'
import { isAuth } from '../../middlewares/auth.midleware.js'

const router = express.Router();

router.get("/", getAllDiscs);
router.get("/:discID", getDiscByID);
router.get("/discByTitle/:title", findDiscByTitle)
router.post("/create", [isAuth], createDisc);
router.put("/edit/:discID", [isAuth], editDisc)
router.delete("/delete/:discID", [isAuth], deleteDisc)
router.put('/add-track', [isAuth], addTrack)

// router.get('/', async (req, res, next) => {
//     try {
//         const disc = await Disc.find().populate('song');
//         return res.status(200).json(disc)
//     } catch (error) {
//         return next(error)
//     }
// });



export { router };
