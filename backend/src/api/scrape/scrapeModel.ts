import { Schema, model, Document } from "mongoose";

interface IScrapeData extends Document {
  url: string;
  summary: string;
  createdAt: Date;
}

const scrapeDataSchema = new Schema<IScrapeData>({
  url: { type: String, required: true },
  summary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ScrapeData = model<IScrapeData>("ScrapeData", scrapeDataSchema);
