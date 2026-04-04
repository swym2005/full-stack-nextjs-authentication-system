import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";


connect();

export async function POST(request: NextRequest)
{
  try {
      const reqBody = await request.json();
      const { email } = reqBody;
  
      const user = await User.findOne({email});
  
      if(user)
      {
          await sendEmail({email, emailType: "RESET", userId: user._id})
      }
        // Always return success regardless
        return NextResponse.json({message: "If an account exists, a reset link has been sent"}, {status: 200})
  } catch (error: any) {
    const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({error: message}, {status: 500})
  }
}