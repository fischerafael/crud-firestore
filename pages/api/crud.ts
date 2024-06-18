import { crud } from "@/server/crud";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const response = await crud.create(
        req.headers.app as string,
        req.headers.user as string,
        {
          company: req.body.company,
          score: req.body.score,
        }
      );
      return res.status(201).json({ message: "Ok", data: response });
    }

    if (req.method === "DELETE") {
      const response = await crud.delete(req.query.id as string);
      return res.status(201).json({ message: "Ok", data: response });
    }

    return res.status(405).json({ message: "Not Implemented" });
  } catch (e: any) {
    return res.status(500).json({ message: e });
  }
}
