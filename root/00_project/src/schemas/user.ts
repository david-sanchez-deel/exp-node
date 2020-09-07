import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  salt: {
    required: true,
    type: String,
  },
  createdAt: Date,
  updatedAt: Date
});

export const User = model('User', userSchema);
