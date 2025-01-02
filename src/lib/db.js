import mongoose from "mongoose";

const uri = process.env.NEXT_PUBLIC_DATABASE_URI;

let cachedConnection = null;

export const connectToDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  cachedConnection = await mongoose.connect(uri, options);

  return cachedConnection;
};

export const disconnectFromDatabase = async () => {
  if (!cachedConnection) {
    return;
  }

  await mongoose.disconnect();
  cachedConnection = null;
};

export default connectToDatabase;
