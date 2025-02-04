import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = async (request: NextRequest) => {
  try {
    const tokendata = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(tokendata, process.env.TOKEN_SECRET!);
    console.log(decodedToken);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
