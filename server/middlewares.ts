import { NextApiRequest } from "next";
const API_KEY = process.env.APP_API_KEY;

const verifyAPIKey = async (req: NextApiRequest) => {
  const apiKey = req.headers?.api_key;
  if (!apiKey) throw new Error("No API Key");
  if (apiKey !== API_KEY) throw new Error("Invalid API Key");
};

const validate = async (req: NextApiRequest) => {
  await verifyAPIKey(req);
};

export const middleWares = { validate };
