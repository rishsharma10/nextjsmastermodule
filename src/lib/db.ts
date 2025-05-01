// lib/db.ts
import mongoose from 'mongoose';
const username = encodeURIComponent("rishabhsharmars147");
const password = encodeURIComponent("12345@Rishabh");
const MONGODB_URI = `mongodb+srv://${username}:${password}@newwebcluster.k1wgrru.mongodb.net/?retryWrites=true&w=majority&appName=newwebcluster`;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  debugger
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
