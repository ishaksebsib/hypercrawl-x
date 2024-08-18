import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { Request, Response, Router } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { scrapeController } from "./scrapeController";

export const scrapeRegistry = new OpenAPIRegistry();
export const scrapeRouter: Router = express.Router();

const scrapeRequestSchema = z.object({
  url: z.string().url(),
});

const scrapeResponseSchema = z.object({
  success: z.boolean(),
  data: z.string().optional(),
  message: z.string().optional(),
});

scrapeRegistry.registerPath({
  method: "post",
  path: "/scrape",
  tags: ["Scraping"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: scrapeRequestSchema,
        },
      },
    },
  },
  responses: createApiResponse(scrapeResponseSchema, "Success"),
});

scrapeRouter.post("/", async (req: Request, res: Response) => {
  await scrapeController(req, res);
});
