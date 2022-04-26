import { Disc } from '../models/Disc.js';
import { httpStatusCode } from '../../utils/httpStatusCode.js';


const getAllDiscs = async (req, res, next) => {
  try {
    const discs = await Disc.find();
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { discs: discs },
    });
  } catch (error) {
    return next(error);
  }
};


const createDisc = async (req, res, next) => {
  try {
   const discPicture = req.file ? req.file.filename : null;
    const newDisc = new Disc({
      title: req.body.title,
      released: req.body.released,
      sales: req.body.sales,
      image: discPicture,
      songs: []
    });

    const newDiscDB = await newDisc.save();

    return res.json({
      status: 201,
      message: httpStatusCode[201],
      data: { disc: newDiscDB },
    });
  } catch (error) {
    return next(error);
  }
};

const getDiscByID = async (req, res, next) => {
  try {
    const { discID } = req.params;
    const discByID = await Disc.findById(discID);

    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { disc: discByID },
    });
  } catch (error) {
    return next(error);
  }
};

const findDiscByTitle = async (req,res,next) => {
  const {title} = req.params;
  try {
    const discByTitle = await Disc.find({title: title});
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: {disc: discByTitle}
    })
  } catch (error) {
    next(error)
  }
}
const editDisc = async (req, res, next) => {
  try {
    const { discID } = req.params;
    const discModify = new Disc(req.body);
    discModify._id = discID;
    const discUpdated = await Disc.findByIdAndUpdate(
      discID,
      discModify
    );
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { disc: discUpdated },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteDisc = async (req,res,next) => {
  try {
    const { discID } = req.params;
    await Disc.findByIdAndDelete(discID);
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: `Erased disc: ${discID}`
    })
  } catch (error) {
    return next(error)
  }
}


const addTrack = async (req, res, next) => {
  try {
      const { discId } = req.body;
      const { songId } = req.body;
      const updatedDisc = await Disc.findByIdAndUpdate(
          discId,
          { $push: { songs: songId } },
          { new: true }
          );
          // const disc = await Disc.findById(discId)
          return res.status(200).json(updatedDisc);
      } catch (error) {
          return next(error);
      }
  };

export { getAllDiscs, createDisc, getDiscByID, editDisc, deleteDisc, findDiscByTitle, addTrack };
