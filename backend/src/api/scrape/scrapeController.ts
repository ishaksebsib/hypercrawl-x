import { Request, Response } from "express";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { scrapeService } from "./scrapeService";

export const scrapeController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { url } = req.body;

  try {
    const { id, summary } = await scrapeService(url);
    const serviceResponse = ServiceResponse.success(
      "Scraping and summarization successful",
      {
        id,
        summary,
      },
    );
    handleServiceResponse(serviceResponse, res);
  } catch (error) {
    const serviceResponse = ServiceResponse.failure(
      (error as Error).message,
      null,
    );
    handleServiceResponse(serviceResponse, res);
  }
};
