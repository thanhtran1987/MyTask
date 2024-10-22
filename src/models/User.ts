import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  _id: String;
  password: String;
  name: String;
}
const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: true,
  },
});
const Users = mongoose.models?.Users || model<IUser>("Users", UserSchema);
export default Users;
