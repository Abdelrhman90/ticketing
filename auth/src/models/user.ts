import mongoose from "mongoose";
import { Password } from "../services/password";
//interface for properties that user will have
interface UserAttr {
  email: string;
  password: string;
}

// interface that describe the properties that the user model will have

interface UserModel extends mongoose.Model<UserDoc> {
  build(userAttr: UserAttr): UserDoc;
}

// interface that describe the properties
//that the user document will have

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
userSchema.statics.build = (userAttr: UserAttr) => {
  return new User(userAttr);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };