import { NextApiRequest, NextApiResponse } from "next";
const API_KEY = process.env.APP_API_KEY;

const verifyAPIKey = async (req: NextApiRequest) => {
  const apiKey = req.headers?.api_key;
  if (!apiKey) throw new Error("No API Key");
  if (apiKey !== API_KEY) throw new Error("Invalid API Key");
};

import Cors from "cors";

const cors = Cors({
  methods: ["POST", "PATCH", "PUT", "DELETE", "GET"],
});

const corsMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    cors(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

export const middleWares = { verifyAPIKey, corsMiddleware: corsMiddleware };
