import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://abdalfadeelh:dqA7dOJnApBbQVQB@cluster0.4czxmst.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );
  return client;
};
