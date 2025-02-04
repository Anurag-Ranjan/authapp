import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const recievedId = await getTokenData(request);
    const data = await User.findOne({ _id: recievedId }).select("-password");
    return NextResponse.json({
      message: "Token data fetched successfully",
      user: data,
      success: true,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    });
  }
}
