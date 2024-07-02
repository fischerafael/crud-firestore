import { servicesUser } from "@/server/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, headers, body } = req;
    if (method === "POST") {
      const data = await servicesUser.findOrCreate({
        app: headers.app as string,
        email: body.email,
        firstName: "",
        lastName: "",
      });
      return res.status(200).json({ message: "Not Implemented", data: data });
    }

    return res.status(405).json({ message: "Not Implemented" });
  } catch (e: any) {
    console.log("[error]", e);
    return res.status(500).json({ e: JSON.stringify(e) });
  }
}
