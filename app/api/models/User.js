import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    surname: { type: String },
    age: { type: Number },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export { User }