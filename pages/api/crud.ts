import { crud } from "@/server/crud";
import { middleWares } from "@/server/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers, query, body } = req;
  try {
    await middleWares.corsMiddleware(req, res);
    await middleWares.verifyAPIKey(req);
    if (method === "POST") {
      const response = await crud.create(
        headers.user as string,
        body,
        headers.app as string
      );
      return res.status(201).json({ message: "Ok", data: response });
    }

    if (method === "DELETE") {
      const response = await crud.delete(
        query.id as string,
        headers.app as string
      );
      return res.status(200).json({ message: "Ok", data: response });
    }

    if (method === "PATCH") {
      await crud.updateById(query.id as string, body, headers.app as string);
      return res.status(200).json({ message: "Ok" });
    }

    if (method === "GET") {
      if (headers.action === "FIND_BY_ID") {
        const response = await crud.findById(
          query.id as string,
          headers.app as string
        );
        return res.status(200).json({ message: "Ok", data: response });
      }
      if (headers.action === "LIST") {
        const response = await crud.list(
          headers.user as string,
          query,
          headers.app as string
        );
        return res.status(200).json({ message: "Ok", data: response });
      }
    }

    return res.status(405).json({ message: "Not Implemented" });
  } catch (e: any) {
    console.log("[error]", e);
    return res.status(500).json({ message: e.message });
  }
}
