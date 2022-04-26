import { Song } from '../models/Song.js';
import { httpStatusCode } from '../../utils/httpStatusCode.js';



const getSongByID = async (req, res, next) => {
    try {
      const { songID } = req.params;
      const songByID = await Song.findById(songID);
  
      return res.json({
        status: 200,
        message: httpStatusCode[200],
        data: { song: songByID },
      });
    } catch (error) {
      return next(error);
    }
  };

  const findSongByTrack = async(req,res,next) => {
    const {song} = req.params;
    try {
      const songByTrack = await Song.find({song: song});
      return res.json({
        status: 200,
        message: httpStatusCode[200],
        data: {song: songByTrack}
      })
    } catch (error) {
      next(error)
    }
  }

  const getAllSongs = async (req, res, next) => {
    try {
      const songs = await Song.find();
      return res.json({
        status: 200,
        message: httpStatusCode[200],
        data: { songs: songs },
      });
    } catch (error) {
      return next(error);
    }
  };


const createSong = async (req, res, next) => {
    try {
      const newSong = new Song({
        track: req.body.track,
        lenght: req.body.lenght,
      });
      const newSongDB = await newSong.save();
      return res.json({
        status: 201,
        message: httpStatusCode[201],
        data: { song: newSongDB },
      });
    } catch (error) {
      return next(error);
    }
  }


const deleteSong = async (req,res,next) => {
    try {
      const { songID } = req.params;
      await Song.findByIdAndDelete(songID);
      return res.json({
        status: 200,
        message: httpStatusCode[200],
        data: `Erased song: ${songID}`
      })
    } catch (error) {
      return next(error)
    }
  }

  const editSong = async (req, res, next) => {
    try {
      const { songID } = req.params;
      const songModify = new Song(req.body);
      songModify._id = songID;
      const songUpdated = await Song.findByIdAndUpdate(
        songID,
        songModify
      );
      return res.json({
        status: 200,
        message: httpStatusCode[200],
        data: { song: songUpdated },
      });
    } catch (error) {
      return next(error);
    }
}



export { getAllSongs, createSong, getSongByID, editSong, deleteSong, findSongByTrack };