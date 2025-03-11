import mongoose, { Schema, Document } from "mongoose";

export interface IProyek extends Document {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  oldprice: Date;
  price: string;
  category: string;
}

const ProyekSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  technologies: { type: [String], required: true }, // Mengubah menjadi array string
  oldprice: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
});

export default mongoose.models.Proyek ||
  mongoose.model<IProyek>("Proyek", ProyekSchema);
