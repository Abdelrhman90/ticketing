import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

jest.mock("../nats-wrapper.ts");

process.env.STRIPE_KEY =
  "sk_test_51HJ0mqDAUx3o4e7ifOPFW6EWZUpHfDl0w2JXJE28szq1ZZGtrLyaIdDhSDQ04PYPNyIwfK1arBMxNBCHCQrAGQTO00wXWKMmHA";

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "abdodasd";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionString = JSON.stringify(session);

  const base64 = Buffer.from(sessionString).toString("base64");

  return [`express:sess=${base64}`];
};
