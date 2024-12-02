import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  tiltle: {
    type: String,
    required: [true, "Title is required"],
    unique: [true, "Project already exists"],
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["ongoing", "completed"],
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
