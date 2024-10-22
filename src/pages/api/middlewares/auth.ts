import type { NextApiRequest, NextApiResponse } from "next";

export interface ResponseData {
  message: string;
}

const authenticate = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
  next: () => void
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticate };
