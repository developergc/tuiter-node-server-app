import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: String,
  likes: Number,
  liked: Boolean,
  dislike:Number,
  username:String,
  time:String,
  handle:String,
  image:String,
}, {collection: 'tuits'});
export default schema;