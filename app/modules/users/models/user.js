import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import iniqueValidator from 'mongoose-unique-validator';
import uuid from 'uuid/v4';

mongoose.plugin(iniqueValidator);

const UserSchema = new Schema({
  email: {
    type: String,
    unique: 'User with email "{VALUE}" already exist',
    lowercase: true,
    required: 'Email is required',
    trim: true,
  },
  hash: {
    type: String,
    unique: 'Hash must ne unique',
  },
  password: {
    type: String,
    required: 'Password is required',
    trim: true,
  },
  firstName: {
    type: String,
    lowercase: true,
    required: 'First name is required',
    trim: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    required: 'Last name is required',
    trim: true,
  },
}, {
  timestamps: true,
});

UserSchema.statics.createFields = ['email', 'password', 'firstName', 'lastName'];

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);

    this.password = bcrypt.hashSync(this.password, salt);
  }

  if (!this.hash) {
    this.hash = uuid();
  }

  next();
});

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('user', UserSchema);
