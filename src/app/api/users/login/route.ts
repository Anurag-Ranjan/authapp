import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User does not exist", status: 400 });
    }

    //compare passwords
    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({
        message: "Incorrect password entered",
        status: 400,
      });
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "login successful",
      status: 200,
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
