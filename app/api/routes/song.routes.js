import express from "express";
import{ 
    getAllSongs, 
    createSong, 
    getSongByID, 
    editSong, 
    deleteSong, 
    findSongByTrack }
 from '../controllers/song.controller.js'
 import { isAuth } from '../../middlewares/auth.midleware.js'


const router = express.Router();

router.get("/", [isAuth], getAllSongs);
router.get("/:songID", getSongByID);
router.get("/songByTrack/:track", findSongByTrack)
router.post("/create", createSong);
router.put("/modify/:songID", editSong)
router.delete("/delete/:songID", deleteSong)


export { router };
