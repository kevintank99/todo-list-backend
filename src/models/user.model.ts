import mongoose, { Schema, Document } from 'mongoose';
import { IUserModel } from '../types/user.types';
import bcrypt from 'bcryptjs';
// Extend mongoose Document with IUserModel
type UserDocument = IUserModel & Document;

const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
  versionKey: false,
  collection: "users",
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export model with typed document
export default mongoose.model<UserDocument>('User', UserSchema);
