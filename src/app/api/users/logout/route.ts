import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "User logged out successfully",
      status: 200,
      success: true,
    });
    console.log("Started");
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    console.log("Done");
    return response;
  } catch (error: any) {
    console.log("Error logging out");
    return NextResponse.json({
      message: error.message,
      status: 500,
      success: false,
    });
  }
}
