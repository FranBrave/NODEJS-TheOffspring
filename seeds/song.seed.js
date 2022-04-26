import mongoose from 'mongoose';
import { Song } from '../app/api/models/Song.js';



const songList = [
  {
    track: 'Jennifer Lost the War',
    lenght: '2:35',
},
{
  track: 'Elders',
  lenght: '2:11',
}
]

const songListDocuments = songList.map(song => new Song(song));


mongoose
  .connect('mongodb://localhost:27017/songs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allSongs = await Song.find();
		
    if (allSongs.length > 0) {
      await Song.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		await Song.insertMany(songListDocuments);
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());