import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  type: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
