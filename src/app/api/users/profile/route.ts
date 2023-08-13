import { mongoConnect } from "@/dbConfig/dbConfig";
import { getUserDetailsFromJwt } from "@/helpers/getUserDetailsFromJwt";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserDetailsFromJwt(request);
    const userDetails = await userModel.findById(userId).select("-password");
    return NextResponse.json(
      { message: "User find successfully", success: true, data: userDetails },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
