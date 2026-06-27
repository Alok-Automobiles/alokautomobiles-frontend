import { MongoClient, type Db } from "mongodb";

type GlobalWithMongo = typeof globalThis & {
  _alokMongoClientPromise?: Promise<MongoClient>;
};

const globalWithMongo = globalThis as GlobalWithMongo;

function getMongoUri() {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  return uri;
}

function getMongoDbName() {
  return process.env.MONGODB_DB?.trim() || "ledger";
}

export function getMongoClient() {
  if (!globalWithMongo._alokMongoClientPromise) {
    const client = new MongoClient(getMongoUri(), {
      maxPoolSize: 5,
      minPoolSize: 0,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 5000,
    });

    globalWithMongo._alokMongoClientPromise = client.connect();
  }

  return globalWithMongo._alokMongoClientPromise;
}

export async function getMongoDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(getMongoDbName());
}
