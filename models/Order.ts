import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  service: string;
  details: string;
  deadline: string;
  whatsapp: string;
  status: string;
  price: string;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  service: { type: String, required: true },
  details: { type: String, required: true },
  deadline: { type: String, required: true },
  whatsapp: { type: String, required: true },
  status: { type: String, required: true },
  price: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
