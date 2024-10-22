"use server";
import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "@/app/lib/mongodb";
import { APIMethod } from "@/helper/data";
import { ResponseError } from "@/helper/common";
import Users from "@/models/User";
import { encrypt } from "@/app/lib/session";

export interface ResponseData {
  token: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>
) {
  await connectDB();
  // check login
  if (req.method === APIMethod.POST) {
    const { name, password } = req.body;

    const account = await Users.findOne({
      name: name,
      password: password,
    });

    if (!account) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({
      name: account.name,
      id: account.id,
      expiresAt,
    });

    res.setHeader("Set-Cookie", `session=${session}; Path=/; HttpOnly`);

    return res.status(200).json({ token: session });
  }
}
