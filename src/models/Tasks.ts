import mongoose, { Schema, model } from "mongoose";

export enum TaskStatus {
  STATUS_PENDING = "Pending",
  STATUS_COMPLETE = "Complete",
  STATUS_DELETE = "Delete",
}

export interface ITask {
  _id?: String;
  id?: String;
  ownerID?: String;
  name?: String;
  description?: String;
  status?: TaskStatus;
}
const TaskSchema = new Schema<ITask>({
  ownerID: {
    type: String,
    required: [true, "ownerID is required"],
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  status: {
    type: String,
    required: [true, "status is required"],
  },
});
const Tasks = mongoose.models?.Tasks || model<ITask>("Tasks", TaskSchema);
export default Tasks;
