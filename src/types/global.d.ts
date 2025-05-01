// types/global.d.ts
import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null|any;
  };
}

export {}; // Makes this a module
