import puppeteer from "puppeteer";

export const scrapeService = async (url: string): Promise<string> => {
  if (!url) throw new Error("URL is required");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    const textContent = await page.evaluate(() => document.body.innerText);
    return textContent;
  } catch (error) {
    throw new Error("Failed to scrape the site: " + (error as Error).message);
  } finally {
    await browser.close();
  }
};
