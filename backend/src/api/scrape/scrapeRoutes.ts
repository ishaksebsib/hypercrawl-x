import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { Request, Response, Router } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { scrapeController } from "./scrapeController";
import { getSummaryController } from "./getSummaryController";

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

// getSummaryResponseSchema is a Zod schema that describes the response of the getSummary endpoint.

const getSummaryResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      summary: z.string(),
    })
    .nullable(),
  message: z.string().optional(),
});

scrapeRegistry.registerPath({
  method: "get",
  path: "/scrape/{id}",
  tags: ["Scraping"],
  request: {
    //params: z.object({ id: z.string() }),
  },
  responses: createApiResponse(getSummaryResponseSchema, "Success"),
});

// endpoints

scrapeRouter.post("/", async (req: Request, res: Response) => {
  await scrapeController(req, res);
});

scrapeRouter.get("/:id", async (req: Request, res: Response) => {
  await getSummaryController(req, res);
});
