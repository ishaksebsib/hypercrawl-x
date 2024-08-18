import puppeteer from "puppeteer";
import { HfInference } from "@huggingface/inference";
import { env } from "@/common/utils/envConfig";
import { logger } from "@/server";
import { ScrapeData } from "./scrapeModel";

export const scrapeService = async (
  url: string,
): Promise<{ id: string; summary: string }> => {
  if (!url) throw new Error("URL is required");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    const textContent = await page.evaluate(() => document.body.innerText);
    const summary = await getSummary(textContent, 80);

    const savedData = await ScrapeData.create({ url, summary });

    return { id: savedData.id, summary };
  } catch (error) {
    throw new Error("Failed to scrape the site: " + (error as Error).message);
  } finally {
    await browser.close();
  }
};

export const getSummary = async (
  text: string,
  maxOutput: number,
): Promise<string> => {
  const HF_ACCESS_TOKEN = env.HF_ACCESS_TOKEN;

  try {
    const inference = new HfInference(HF_ACCESS_TOKEN);

    const result = await inference.summarization({
      model: "sshleifer/distilbart-cnn-12-6",
      inputs: text,
      parameters: {
        max_length: maxOutput,
      },
    });

    return result.summary_text;
  } catch (error) {
    logger.error(`Failed to generate summary: ${(error as Error).message}`);
    throw new Error("Failed to generate summary");
  }
};
