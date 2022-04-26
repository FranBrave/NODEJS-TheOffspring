import express from "express";
import{ 
    getAllSongs, 
    createSong, 
    getSongByID, 
    editSong, 
    deleteSong, 
    findSongByTrack }
 from '../controllers/song.controller.js'
 import { isAuth } from '../../middlewares/auth.middleware.js'


const router = express.Router();

router.get("/", getAllSongs);
router.get("/:songID", getSongByID);
router.get("/songByTrack/:track", findSongByTrack)
router.post("/create", [isAuth], createSong);
router.put("/modify/:songID", [isAuth], editSong)
router.delete("/delete/:songID", [isAuth], deleteSong)


export { router };
