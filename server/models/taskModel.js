import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    projectName: { type: String, required: true },
    typeOfWork: {
      type: String,
      required: true,
      enum: [
        "Bug Fix",
        "Feature",
        "Documentation",
        "Testing",
        "Deployment",
        "Other",
      ],
    },
    description: { type: String, required: true },
    taskDate: { type: Date, default: Date.now },
    links: [String],
    timeTaken: { type: Number, required: true }, // in hours
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
