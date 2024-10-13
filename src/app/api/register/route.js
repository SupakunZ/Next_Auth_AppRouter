import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) { //**ชื่อ Function ใช้กำหนด http method */
  try {
    const { name, email, password } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    //Process
    //1.ConnectDB
    connectMongoDB()
    //2.Create Models and send to database
    await User.create({ name, email, password: hashedPassword }) //**Password hashed*/

    return NextResponse.json({ message: "User registered" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "An error occured while registrating the user." }, { status: 500 })
  }
}

// GET Method
// export async function GET(req) { //**ชื่อ Function ใช้กำหนด http method */
//   return NextResponse.json({ message: "Hello" })
// }