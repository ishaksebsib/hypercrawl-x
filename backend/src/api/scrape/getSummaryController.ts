import { Request, Response } from "express";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { ScrapeData } from "../scrape/scrapeModel";

export const getSummaryController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await ScrapeData.findById(id);

    if (!data) {
      const serviceResponse = ServiceResponse.failure(
        "No data found for the given ID",
        null,
      );
      handleServiceResponse(serviceResponse, res);
      return;
    }

    const serviceResponse = ServiceResponse.success(
      "Data retrieved successfully",
      data,
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
