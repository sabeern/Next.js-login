import { mongoConnect } from "@/dbConfig/dbConfig";
import userModel from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

mongoConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not exist" }, { status: 400 });
    }
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Username or password invalid" },
        { status: 400 }
      );
    }
    const tokenData = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    const response = NextResponse.json(
      { message: "Login successfull", success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    console.log("err", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
