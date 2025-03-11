import mongoose, { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    service: { type: String, required: true },
    details: { type: String, required: true },
    deadline: { type: String, required: true },
    whatsapp: { type: String, required: true },
    date: { type: String, default: new Date().toISOString() },
  },
  { timestamps: true }
);

export const Task = models.Task || model("Task", TaskSchema);
