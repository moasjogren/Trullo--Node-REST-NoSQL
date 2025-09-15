import mongoose, { Schema, InferSchemaType, Types } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true, collection: "users" }
);

export type UserType = InferSchemaType<typeof userSchema>;
export const User = mongoose.model("User", userSchema);

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["TO_DO", "IN_PROGRESS", "BLOCKED", "DONE"],
      default: "TO_DO",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId || null,
      ref: "User",
    },
    finishedAt: { type: Date || null },
    finishedBy: {
      type: mongoose.Schema.Types.ObjectId || null,
      ref: "User",
    },
  },
  { timestamps: true, collection: "tasks" }
);

export type TaskType = InferSchemaType<typeof taskSchema>;
export const Task = mongoose.model("Task", taskSchema);
