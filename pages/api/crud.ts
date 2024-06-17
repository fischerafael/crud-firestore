import { crud } from "@/server/crud";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const response = crud.create("test.app", "rafaelsanfischer@gmail.com", {
        company: req.body.company,
        score: req.body.score,
      });
      return res.status(201).json({ message: "Ok", data: response });
    }

    return res.status(405).json({ message: "Not Implemented" });
  } catch (e: any) {
    return res.status(500).json({ message: e });
  }
}
