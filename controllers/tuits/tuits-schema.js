import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: String,
  likes: Number,
  liked: Boolean,
  dislike:Number,
}, {collection: 'tuits'});
export default schema;